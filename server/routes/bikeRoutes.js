import express from 'express';
import { getBikes, getBikeById, addBike, updateBike, deleteBike } from '../controllers/bikeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getBikes)
    .post(protect, admin, addBike);

router.route('/:id')
    .get(getBikeById)
    .put(protect, admin, updateBike)
    .delete(protect, admin, deleteBike);

export default router;
