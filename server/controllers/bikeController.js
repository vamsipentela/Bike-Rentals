import Bike from '../models/Bike.js';

// @desc    Get all bikes
// @route   GET /api/bikes
// @access  Public
export const getBikes = async (req, res) => {
    try {
        const bikes = await Bike.find({});
        res.json(bikes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get bike by ID
// @route   GET /api/bikes/:id
// @access  Public
export const getBikeById = async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);
        if (bike) {
            res.json(bike);
        } else {
            res.status(404).json({ message: 'Bike not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add new bike (Admin only)
// @route   POST /api/bikes
// @access  Private/Admin
export const addBike = async (req, res) => {
    try {
        const bike = await Bike.create(req.body);
        console.log(`New Bike Created in Local DB: ${bike.name}`);
        res.status(201).json(bike);
    } catch (error) {
        res.status(400).json({ message: 'Invalid bike data' });
    }
};

// @desc    Update bike (Admin only)
// @route   PUT /api/bikes/:id
// @access  Private/Admin
export const updateBike = async (req, res) => {
    try {
        const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (bike) {
            res.json(bike);
        } else {
            res.status(404).json({ message: 'Bike not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating bike' });
    }
};

// @desc    Delete bike (Admin only)
// @route   DELETE /api/bikes/:id
// @access  Private/Admin
export const deleteBike = async (req, res) => {
    try {
        const bike = await Bike.findByIdAndDelete(req.params.id);
        if (bike) {
            res.json({ message: 'Bike removed' });
        } else {
            res.status(404).json({ message: 'Bike not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
