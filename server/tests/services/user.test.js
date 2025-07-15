import { defineFeature, loadFeature } from 'jest-cucumber';
import mongoose from 'mongoose';
import UserService from '../../services/user.service.js';
import User from '../../models/user.model.js';

const feature = loadFeature('./tests/services/user.feature');

jest.mock('../../models/user.model.js');

defineFeature(feature, (test) => {
  let result;
  let error;
  let mockUser, mockUserA, mockUserB, mockUsers;
  const fakeId = new mongoose.Types.ObjectId().toHexString();

  beforeEach(() => {
    result = null;
    error = null;
    jest.clearAllMocks();

    mockUser = { _id: new mongoose.Types.ObjectId().toHexString(), name: 'Usuário Teste', email: 'teste@email.com' };
    mockUserA = { _id: new mongoose.Types.ObjectId().toHexString(), name: 'User A', email: 'a@email.com' };
    mockUserB = { _id: new mongoose.Types.ObjectId().toHexString(), name: 'User B', email: 'b@email.com' };
    mockUsers = [mockUserA, mockUserB];
  });

  test('Buscar um usuário por ID existente', ({ given, when, then }) => {
    given('um usuário já existe no sistema', () => { User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue(mockUser) }); });
    when('eu buscar esse usuário pelo seu ID', async () => { result = await UserService.getUserById(mockUser._id); });
    then('os dados do usuário devem ser retornados', () => { expect(result).toEqual(mockUser); });
  });

  test('Buscar um usuário por ID inexistente', ({ given, when, then }) => {
    given('o ID fornecido não pertence a nenhum usuário', () => { User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue(null) }); });
    when('eu buscar um usuário por esse ID', async () => { result = await UserService.getUserById(fakeId); });
    then('o resultado da busca deve ser nulo', () => { expect(result).toBeNull(); });
  });
  
  test('Atualizar o nome de um usuário existente', ({ given, when, then }) => {
    const newName = "Nome Novo";
    given('um usuário já existe no sistema', () => { User.findByIdAndUpdate.mockReturnValue({ select: jest.fn().mockResolvedValue({ ...mockUser, name: newName }) }); });
    when(/^eu atualizar o nome desse usuário para "(.*)"$/, async (name) => { result = await UserService.updateUser(mockUser._id, { name }); });
    then('os dados do usuário devem ser retornados com o nome atualizado', () => { expect(result.name).toBe(newName); });
  });

  test('Tentar atualizar um usuário que não existe', ({ given, when, then }) => {
    given('o ID de um usuário que não existe no sistema', () => { User.findById.mockResolvedValue(null); });
    when('eu tentar atualizar esse usuário', async () => { result = await UserService.updateUser(fakeId, { name: "Qualquer Nome" }); });
    then('o resultado da operação deve ser nulo', () => { expect(result).toBeNull(); });
  });

  test('Tentar atualizar um usuário para um e-mail que já está em uso', ({ given, when, then }) => {
    given('existem dois usuários: "userA" com e-mail "a@email.com" e "userB" com e-mail "b@email.com"', () => {
      User.findById.mockResolvedValue(mockUserA);
      User.findOne.mockResolvedValue(mockUserB);
    });
    when('eu tentar atualizar o e-mail de "userA" para "b@email.com"', async () => {
      try { await UserService.updateUser(mockUserA._id, { email: mockUserB.email }); } 
      catch (e) { error = e; }
    });
    then('um erro deve ser lançado dizendo que o e-mail já está em uso', () => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Este e-mail já está em uso.");
    });
  });

  test('Atualizar a senha de um usuário', ({ given, when, then }) => {
    const newPassword = "novaSenha123";
    given('um usuário já existe no sistema', () => {
      User.findByIdAndUpdate.mockReturnValue({ select: jest.fn().mockResolvedValue({ ...mockUser, password: newPassword }), });
    });
    when('eu atualizar a senha desse usuário para "novaSenha123"', async () => {
      result = await UserService.updateUser(mockUser._id, { password: newPassword });
    });
    then('a operação de atualização deve ser chamada com a nova senha', () => {
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, { password: newPassword }, { new: true, runValidators: true });
    });
  });

  test('Criar um novo usuário com sucesso', ({ given, when, then }) => {
    given('não existe um usuário com o e-mail "novo@email.com"', () => { User.findOne.mockResolvedValue(null); });
    when('eu criar um novo usuário com os dados para "novo@email.com"', async () => {
      const newUser = { name: "Novo Usuário", email: "novo@email.com" };
      User.create.mockResolvedValue(newUser);
      result = await UserService.createUser(newUser);
    });
    then('um novo usuário deve ser retornado com sucesso', () => { expect(result.email).toBe("novo@email.com"); });
  });

  test('Tentar criar um usuário com um e-mail que já existe', ({ given, when, then }) => {
    given('um usuário com o e-mail "existente@email.com" já foi criado', () => { User.findOne.mockResolvedValue({ email: "existente@email.com" }); });
    when('eu tentar criar um novo usuário com o e-mail "existente@email.com"', async () => {
      try { await UserService.createUser({ email: "existente@email.com" }); } 
      catch (e) { error = e; }
    });
    then('um erro deve ser lançado dizendo que o e-mail já está em uso', () => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Este e-mail já está em uso.");
    });
  });

  test('Deletar um usuário com sucesso', ({ given, when, then }) => {
    given('um usuário já existe no sistema', () => { User.findByIdAndDelete.mockResolvedValue(mockUser); });
    when('eu deletar esse usuário', async () => { result = await UserService.deleteUser(mockUser._id); });
    then('o usuário deletado deve ser retornado', () => { expect(result).toEqual(mockUser); });
  });

  test('Listar todos os usuários', ({ given, when, then }) => {
    given('existem múltiplos usuários no sistema', () => { User.find.mockReturnValue({ select: jest.fn().mockResolvedValue(mockUsers) }); });
    when('eu solicitar a lista de todos os usuários', async () => { result = await UserService.getAllUsers(); });
    then('uma lista contendo todos os usuários deve ser retornada', () => {
      expect(result).toEqual(mockUsers);
      expect(result.length).toBe(2);
    });
  });
});
