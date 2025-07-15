import mongoose from "mongoose";
import User from "../models/user.model.js";
import * as userService from "../services/user.service.js";

describe("User Service", () => {
  beforeAll(async () => {
    const url = "mongodb+srv://tfcl:byBDc2RpYRBYGiQk@cluster0.q8lmdsw.mongodb.net/";
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

  it("deve criar um usuário válido", async () => {
    const user = await userService.createUser({
      name: "João",
      email: "joao@email.com",
      password: "123456",
    });
    expect(user).toHaveProperty("_id");
    expect(user).toHaveProperty("name", "João");
    expect(user).toHaveProperty("email", "joao@email.com");
  });

  it("não deve criar usuário com email já existente", async () => {
    await userService.createUser({
      name: "Maria",
      email: "maria@email.com",
      password: "123456",
    });
    await expect(
      userService.createUser({
        name: "Maria",
        email: "maria@email.com",
        password: "654321",
        isAdmin: false,
      })
    ).rejects.toThrow("Este e-mail já está em uso.");
  });

  it("deve retornar todos os usuários", async () => {
    await userService.createUser({
      name: "Ana",
      email: "ana@email.com",
      password: "123456",
    });
    const users = await userService.getUsers();
    expect(Array.isArray(users)).toBe(true);
  });

  it("deve retornar um usuário pelo id", async () => {
    const user = await userService.createUser({
      name: "Carlos",
      email: "carlos@email.com",
      password: "123456",
    });
    const found = await userService.getUserById(user._id);
    expect(found).toHaveProperty("name", "Carlos");
  });

  it("deve retornar null se usuário não existir ao buscar por id", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const found = await userService.getUserById(fakeId);
    expect(found).toBeNull();
  });

  it("deve atualizar um usuário existente", async () => {
    const user = await userService.createUser({
      name: "Pedro",
      email: "pedro@email.com",
      password: "123456",
    });
    const updated = await userService.updateUser(user._id, {
      name: "Pedro Atualizado",
    });
    expect(updated).toHaveProperty("name", "Pedro Atualizado");
  });

  it("não deve atualizar para email já existente", async () => {
    await userService.createUser({
      name: "Lucas",
      email: "lucas@email.com",
      password: "123456",
    });
    const user = await userService.createUser({
      name: "Rafael",
      email: "rafael@email.com",
      password: "123456",
    });
    await expect(
      userService.updateUser(user._id, { email: "lucas@email.com" })
    ).rejects.toThrow("Este e-mail já está em uso.");
  });

  it("deve retornar null se usuário não existir ao atualizar", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const updated = await userService.updateUser(fakeId, { name: "Novo Nome" });
    expect(updated).toBeNull();
  });

  it("deve deletar um usuário existente", async () => {
    const user = await userService.createUser({
      name: "Bruno",
      email: "bruno@email.com",
      password: "123456",
    });
    const deleted = await userService.deleteUser(user._id);
    expect(deleted).toHaveProperty("_id");
  });

  it("deve retornar null se usuário não existir ao deletar", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const deleted = await userService.deleteUser(fakeId);
    expect(deleted).toBeNull();
  });
});
