const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String },
    description: { type: String },
    location: {
        alt: { type: Number },
        lat: { type: Number },
        direction: { type: String }
    },
    place_id: { type: String },
    image: { type: String },
    registedby: { type: String },
    ratings: [{
        user: {  type: Schema.Types.ObjectId, ref: "users" },
        nickname: { type: String },
        rate: { type: Number }
    }]
});

module.exports = Place = mongoose.model("places",PlaceSchema);