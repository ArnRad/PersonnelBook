const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    region_id: {
        type: Array,
        required: true
    },
    region: {
        type: Object,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Group', groupSchema);