const mongoose = require('mongoose');

const heroSchema = mongoose.Schema({
    superheroname: {
        type: String
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Hero', heroSchema)