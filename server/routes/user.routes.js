import express from 'express'; // Default

// Import "user" controller functions
import { createUser, getUsers } from '../controllers/user.controller.js';

const router = express.Router(); // Default

// Define routes for "user" operations
router.post('/', createUser); 
router.get('/', getUsers);

export default router; // Default
