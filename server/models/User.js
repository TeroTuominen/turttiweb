const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Tämä on tärkeä, jotta salasanoja voidaan hashata
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true},
    email: String,
    password: String,
    createdAt: {
        default: Date.now(),
        type: Date},
        role: String,

});

UserSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;