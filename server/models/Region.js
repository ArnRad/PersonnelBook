const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    subdivision_id: {
        type: String,
        required: true
    },
    subdivision: {
        type: Object
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Region', regionSchema);