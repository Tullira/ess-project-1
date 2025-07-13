import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  // Cria um novo usuário no banco de dados
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Por favor, preencha todos os campos." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Este e-mail já está em uso." });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Usuário criado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    // Busca todos os usuários no banco de dados
    const users = await User.find({}).select("-password");

    // Retorna a lista de usuários em formato JSON
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    // Verifica se o usuário existe
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Se o email está sendo alterado, verifica se já existe
    if (email && email !== userExists.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Este e-mail já está em uso." });
      }
    }

    // Prepara os dados para atualização
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      user: updatedUser,
      message: "Usuário atualizado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};
