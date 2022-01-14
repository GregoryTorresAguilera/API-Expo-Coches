const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        brand:{type: String, required: true, trim: true},
        type: {type: String, required: true, trim: true},
        year: {type: Number, required: true, trim: true},
        img: { type: String, trim: true } 
    },
    {
        timestamps: true 
    }
    
);
const Vehicle = mongoose.model('vehicles', VehicleSchema)
module.exports = Vehicle