const mongoose = require('mongoose');

const subdivisionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    division_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Division' },
    workplace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workplace' }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Subdivision', subdivisionSchema);