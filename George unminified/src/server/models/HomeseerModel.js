const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeseerSchema = new Schema({
    devices: {
        type: Object,
        required: true
    }
})

module.exports = HomeseerModel = mongoose.model('homeseer', HomeseerSchema);
