const express = require('express');
const Employee = require('../../models/Employee');

const router = express.Router();

// GET Employees
router.get('/', async (req, res) => {
    try {
        let resultEmployees = await Employee.find();
        let { page = 1, limit = 8 } = req.query;
        if(req.query.page) {
            page = req.query.page;
        }
        if(req.query.limit) {
            limit = req.query.limit
        }
        const total = resultEmployees.length;
        const pages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const employees = resultEmployees.slice(startIndex, endIndex);
        res.status(200).json({ total: total , last_page: pages, employees});
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Add Employees

router.post('/', async (req, res) => {
    const new_employee = new Employee({
        name: req.body.name,
        lastname: req.body.lastname,
        mobile_number: req.body.mobile_number,
        work_number: req.body.work_number,
        email: req.body.email,
        avatar: req.body.avatar,
        gender: req.body.gender,
        position: req.body.position,
        workplace: req.body.workplace,
        subdivision: req.body.subdivision,
        division: req.body.division,
        region: req.body.region,
        group: req.body.group,
        subgroup: req.body.subgroup
    });
    try {
        const savedEmployee = await new_employee.save();
        res.json(savedEmployee);
    } catch (err) {
        res.json({message: err});
    }
});

// Get Employee

router.get('/:employeeId', async (req, res) => {
    try{
        const employee = await Employee.findById(req.params.employeeId);
        res.status(200).json(employee);

    } catch (err) {
        res.status(500).json({message: err})
    }
});


// Delete Employees

router.delete('/:employeeId', async (req, res) => {
    try {
        const removedEmployee = await Employee.remove({_id: req.params.employeeId});
        res.status(200).json(removedEmployee).send("Vartotojas ištrintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Update Employee

router.patch('/:employeeId', async (req, res) => {
    try {
        const updateEmployee = await Employee.updateOne(
            {_id: req.params.employeeId}, 
            {$set: {
                name: req.body.name,
                lastname: req.body.lastname,
                mobile_number: req.body.mobile_number,
                work_number: req.body.work_number,
                email: req.body.email,
                avatar: req.body.avatar,
                gender: req.body.gender,
                position: req.body.position,
                workplace_id: req.body.workplace_id,
                subdivision_id: req.body.subdivision_id,
                division_id: req.body.division_id,
                region_id: req.body.region_id,
                group_id: req.body.group_id,
                subgroup_id: req.body.subgroup_id
            }}
        );
        res.status(200).json(updateEmployee).send("Vartotojas atnaujintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Functions


module.exports = router;