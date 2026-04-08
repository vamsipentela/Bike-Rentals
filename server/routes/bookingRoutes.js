import express from 'express';
import { createBooking, getBookings, getMyBookings, deleteBooking, completeBooking } from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getBookings)
    .post(protect, createBooking);

router.get('/mybookings', protect, getMyBookings);
router.delete('/:id', protect, deleteBooking);
router.put('/:id/complete', protect, completeBooking);

export default router;
