const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User model
const UserSchema = new Schema({
    nickname: { type: String, required: true },
    name: { type: String, required: true },
    facebook_id: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    security: {
        question: { type: String },
        answer: { type: String }
    },
    status: { type: Number, default: 0, required: true },
    date: { type: Date, default: Date.now(), required: true },
    city: { type: String }
});

module.exports = User = mongoose.model('users',UserSchema);