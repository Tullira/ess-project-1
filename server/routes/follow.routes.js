import express from 'express'; // Default

// Import "follow" controller functions
import { createFollow, getFollows } from '../controllers/follow.controller.js';

const router = express.Router(); // Default

// Define routes for "follow" operations
router.post('/', createFollow);
router.get('/', getFollows);

export default router; // Default
