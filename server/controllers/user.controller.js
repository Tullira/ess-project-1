import User from '../models/user.model.js';

export const createUser = async (req, res) => {
    // Cria um novo usuário no banco de dados
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: 'Este e-mail já está em uso.' });
        }

        const user = await User.create({ name, email, password });
        
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          message: 'Usuário criado com sucesso!'
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
      // Busca todos os usuários no banco de dados
      const users = await User.find({});
  
      // Retorna a lista de usuários em formato JSON
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById()
  } catch (error) {
  res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
}