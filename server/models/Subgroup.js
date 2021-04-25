const mongoose = require('mongoose');

const subgroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Subgroup', subgroupSchema);