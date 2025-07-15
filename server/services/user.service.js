import User from '../models/user.model.js';

class UserService {
  /**
   * Cria um novo usuário no banco de dados.
   * @param {object} userData - Dados do usuário { name, email, password }.
   * @returns {Promise<object>} O usuário criado.
   * @throws {Error} Se o e-mail já estiver em uso.
   */
  static async createUser({ name, email, password }) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("Este e-mail já está em uso.");
      error.status = 400;
      throw error;
    }
    const user = await User.create({ name, email, password });
    return user;
  }

  /**
   * Retorna todos os usuários, excluindo suas senhas.
   * @returns {Promise<Array<object>>} Uma lista de usuários.
   */
  static async getAllUsers() {
    return User.find({}).select("-password");
  }

  /**
   * Busca um usuário pelo seu ID, excluindo a senha.
   * @param {string} id - O ID do usuário.
   * @returns {Promise<object|null>} O usuário encontrado ou nulo.
   */
  static async getUserById(id) {
    return User.findById(id).select("-password");
  }

  /**
   * Atualiza os dados de um usuário.
   * @param {string} id - O ID do usuário a ser atualizado.
   * @param {object} updateData - Os dados a serem atualizados { name, email, password }.
   * @returns {Promise<object|null>} O usuário atualizado ou nulo se não for encontrado.
   * @throws {Error} Se o novo e-mail já estiver em uso por outro usuário.
   */
  static async updateUser(id, { name, email, password }) {
    const userExists = await User.findById(id);
    if (!userExists) {
      return null;
    }

    if (email && email !== userExists.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        const error = new Error("Este e-mail já está em uso.");
        error.status = 400;
        throw error;
      }
    }

    const dataToUpdate = {};
    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (password) dataToUpdate.password = password;

    return User.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
      runValidators: true,
    }).select("-password");
  }

  /**
   * Deleta um usuário do banco de dados.
   * @param {string} id - O ID do usuário a ser deletado.
   * @returns {Promise<object|null>} O usuário que foi deletado ou nulo se não for encontrado.
   */
  static async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  }
}

export default UserService;