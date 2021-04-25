const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    subdivision_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subdivision' }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Region', regionSchema);