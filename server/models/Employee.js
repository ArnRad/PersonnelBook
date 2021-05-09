const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        mobile_number: {
            type: Number,
            required: false
        },
        work_number: {
            type: Number,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        avatar: {
            type: String,
            required: false
        },
        gender: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        workplace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workplace' },
        subdivision_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subdivision' },
        division_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Division' },
        region_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' },
        group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
        subgroup_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subgroup' }
    },
    {
        timestamps: true 
    }
)

module.exports = mongoose.model('Employees', EmployeeSchema);
