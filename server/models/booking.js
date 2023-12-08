const mongoose = require('mongoose');
const NewPlace = require('./accomendation');

const bookingSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: NewPlace,
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  checkIn: {
    type: Date, 
    required: true,
  },
  checkOut: {
    type: Date, 
    required: true,
  },
  numberOfGuest: {
    type: Number,
  },
  name: {
    type: String,
  },
  number: {
    type: Number,
  },
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;
