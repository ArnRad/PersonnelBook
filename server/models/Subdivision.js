const mongoose = require('mongoose');

const subdivisionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    division_id: {
        type: String,
        required: true
    },
    division: {
        type: Object
    },
    workplace: {
        type: Object
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Subdivision', subdivisionSchema);