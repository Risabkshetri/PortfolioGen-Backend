const mongoose = require('mongoose')

const codeSchema = new mongoose.Schema({
    id: {
        type: Date,
        default: Date.now()
    },
    tag: [{
        type: String,
        trim: true
    }],
    html:{
        type: String,
        required: true,
    },
    css: {
        type: String,
        required: true,
    },
    javascript:{
        type: String,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('Template', codeSchema);