const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    workplace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workplace' },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Division', divisionSchema);