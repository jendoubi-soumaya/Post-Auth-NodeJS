const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    Title : {
        type: String,
        required: true
    },
    Content : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);