const mongoose = require('mongoose');

const subdivisionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    division_id: {
        type: Array,
        required: true
    },
    division: {
        type: Object
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Subdivision', subdivisionSchema);