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
        workplace_id: {
            type: Number,
            required: true
        },
        subdivision_id: {
            type: Number,
            required: true
        },
        division_id: {
            type: Number,
            required: true
        },
        region_id: {
            type: Number,
            required: false
        },
        group_id: {
            type: Number,
            required: true
        },
        subgroup_id: {
            type: Number,
            required: true
        }
    }
    // {
    //     timestamps: true 
    // }
)

module.exports = mongoose.model('Employees', EmployeeSchema);
