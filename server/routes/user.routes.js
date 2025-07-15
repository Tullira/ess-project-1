import express from "express";

// Import "user" controller functions
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

// Define routes for "user" operations
// CREATE - POST /api/users
router.post("/", userController.createUser);

// READ ALL - GET /api/users
router.get("/", userController.getUsers);

// READ ONE - GET /api/users/:id
router.get("/:id", userController.getUserById);

// UPDATE - PUT /api/users/:id
router.put("/:id", userController.updateUser);

// DELETE - DELETE /api/users/:id
router.delete("/:id", userController.deleteUser);

export default router;
