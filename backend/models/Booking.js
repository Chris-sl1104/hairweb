const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    selectedServices: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    totalDuration: { type: Number, required: true },
    appointmentTime: { type: Date, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
