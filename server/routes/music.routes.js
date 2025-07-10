import express from 'express'; // Default

// Import "music" controller functions
import { createMusic, getMusics } from '../controllers/music.controller.js';

const router = express.Router(); // Default

// Define routes for "music" operations
router.post('/', createMusic);
router.get('/', getMusics);

export default router; // Default
