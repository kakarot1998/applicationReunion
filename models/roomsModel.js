const mongoose = require('mongoose');
//const user = require('userModel._id');

const roomsTable = new mongoose.Schema({
  message: {
    type: String
    },
    emetteur: {
    type: String
        }
    },
        {
    timestamps: true
});

const roomsModel = mongoose.model('roomsModel', roomsTable);

module.exports = roomsModel;