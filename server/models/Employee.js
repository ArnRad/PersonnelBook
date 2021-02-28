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
        workplace: {
            type: Object,
            required: true
        },
        subdivision: {
            type: Object,
            required: true
        },
        division: {
            type: Object,
            required: true
        },
        region: {
            type: Object,
            required: false
        },
        group: {
            type: Object,
            required: true
        },
        subgroup: {
            type: Object,
            required: true
        }
    },
    {
        timestamps: true 
    }
)

module.exports = mongoose.model('Employees', EmployeeSchema);
