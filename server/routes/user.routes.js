import express from "express";

// Import "user" controller functions
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Define routes for "user" operations
// CREATE - POST /api/users
router.post("/", createUser);

// READ ALL - GET /api/users
router.get("/", getUsers);

// READ ONE - GET /api/users/:id
router.get("/:id", getUserById);

// UPDATE - PUT /api/users/:id
router.put("/:id", updateUser);

// DELETE - DELETE /api/users/:id
router.delete("/:id", deleteUser);

export default router;
