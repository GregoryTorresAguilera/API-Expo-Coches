const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpoSchema = new Schema({
    name: { type: String, required: true, trim: true },
    year: { type: Number, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    vehicles: [{ type: Schema.Types.ObjectId, ref: "vehicles"}]
}, { timestamp: true }
)

const Expo = mongoose.model('expos', ExpoSchema)
module.exports = Expo