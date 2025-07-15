import User from "../models/user.model.js";

export async function createUser({ name, email, password }) {
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("Este e-mail já está em uso.");
    error.status = 400;
    throw error;
  }
  const user = await User.create({ name, email, password });
  return user;
}

export async function getUsers() {
  return User.find({}).select("-password");
}

export async function getUserById(id) {
  return User.findById(id).select("-password");
}

export async function updateUser(id, { name, email, password }) {
  const userExists = await User.findById(id);
  if (!userExists) return null;
  if (email && email !== userExists.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      const error = new Error("Este e-mail já está em uso.");
      error.status = 400;
      throw error;
    }
  }
  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = password;
  return User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");
}

export async function deleteUser(id) {
  const user = await User.findByIdAndDelete(id);
  return user;
}
