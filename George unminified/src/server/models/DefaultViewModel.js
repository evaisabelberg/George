const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DefaultViewSchema = new Schema({
    devices: {
        type: Object,
        required: true
    }
})

module.exports = DefaultViewModel = mongoose.model('defaultView', DefaultViewSchema);
