import express from 'express'; // Default

// Import "review" controller functions
import { createReview, getReview } from '../controllers/review.controller.js';

const router = express.Router(); // Default

// Define routes for "review" operations
router.post('/', createReview);
router.get('/', getReview);

export default router; // Default
