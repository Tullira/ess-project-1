import * as userService from "../services/user.service.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Por favor, preencha todos os campos." });
  }
  try {
    const user = await userService.createUser({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Usuário criado com sucesso!",
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await userService.updateUser(id, {
      name,
      email,
      password,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.status(200).json({
      user: updatedUser,
      message: "Usuário atualizado com sucesso!",
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
