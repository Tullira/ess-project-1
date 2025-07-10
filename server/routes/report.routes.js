import express from 'express'; // Default

// Import "report" controller functions
import { createReport, getReport } from '../controllers/report.controller.js';

const router = express.Router(); // Default

// Define routes for "report" operations
router.post('/', createReport);
router.get('/', getReport);

export default router; // Default
