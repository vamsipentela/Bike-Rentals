import Booking from '../models/Booking.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
    try {
        const { bike, pickupDate, totalPrice } = req.body;
        
        const booking = await Booking.create({
            user: req.user._id,
            bike,
            pickupDate,
            totalPrice,
            status: 'Confirmed'
        });

        console.log(`Booking Created locally: ID ${booking._id} for user ${req.user.name}`);
        res.status(201).json(booking);
    } catch (error) {
        console.error('Error creating booking:', error.message);
        res.status(400).json({ message: 'Invalid booking data' });
    }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'name email').populate('bike', 'name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('bike', 'name image brand');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Cancel/Remove booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            booking.status = 'Cancelled';
            await booking.save();
            res.json({ message: 'Booking cancelled recursively', booking });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Complete booking
// @route   PUT /api/bookings/:id/complete
// @access  Private/Admin
export const completeBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            booking.status = 'Completed';
            await booking.save();
            res.json({ message: 'Booking marked as completed', booking });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
