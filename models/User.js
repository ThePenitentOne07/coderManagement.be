const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['manager', 'employee'],
        default: 'employee',
    },
});

module.exports = mongoose.model('User', UserSchema);
