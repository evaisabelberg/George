const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    order: {
        type: Array
    }
});

module.exports = UserModel = mongoose.model('user', UserSchema);
