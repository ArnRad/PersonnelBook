const express = require('express');
const Employee = require('../../models/Employee');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './server/uploads/images')
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
})

const fileFilter = function(req, file, callback) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]

    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Wrong file type")
        error.code = "LIMIT_FILE_TYPES"
        return callback(error, false)
    }

    callback(null, true)
}

const MAX_SIZE = 200000

const upload = multer({
    storage: storage,
    fileFilter,
    limits: {
        fileSize: MAX_SIZE
    }
})

const router = express.Router();

// GET Employees
router.get('/', async (req, res) => {
    try {
        let resultEmployees = await Employee.find();
        let { page = 1, limit = 8 } = req.query;
        let employeesArray = [], divisionsArray = [], subdivisionsArray = []
        let regionsArray = [], groupsArray = [], subgroupsArray = []
        if(req.query.page) {
            page = req.query.page;
        }
        if(req.query.limit) {
            limit = req.query.limit
        }
        if(req.query.workplace) {
            let workplace = req.query.workplace
            let division = req.query.division
            let subdivision = req.query.subdivision
            let region = req.query.region
            let group = req.query.group
            let subgroup = req.query.subgroup
            if (division && workplace && subdivision && region && group && subgroup) {
                employeesArray = []
                resultEmployees.forEach(emp => {
                    if (emp.workplace._id === workplace && emp.division._id === division
                        && emp.subdivision._id === subdivision && emp.region._id === region
                        && emp.group._id === group && emp.subgroup._id === subgroup) 
                    {
                        employeesArray.push(emp);
                    }
                    if (emp.division.workplace_id[0] === workplace) {
                        divisionsArray.push(emp.division)
                    }
                    if (emp.subdivision.division_id[0] === division) {
                        subdivisionsArray.push(emp.subdivision)
                    }
                    if (emp.region.subdivision_id[0] === subdivision) {
                        regionsArray.push(emp.region)
                    }
                    if (emp.group.region_id[0] === region) {
                        groupsArray.push(emp.group)
                    }
                    if (emp.subgroup.group_id[0] === group) {
                        subgroupsArray.push(emp.subgroup)
                    }
                })
            } else if (division && workplace && subdivision && region && group) {
                employeesArray = []
                resultEmployees.forEach(emp => {
                    if (emp.workplace._id === workplace && emp.division._id === division
                        && emp.subdivision._id === subdivision && emp.region._id === region
                        && emp.group._id === group) 
                    {
                        employeesArray.push(emp);
                    }
                    if (emp.division.workplace_id[0] === workplace) {
                        divisionsArray.push(emp.division)
                    }
                    if (emp.subdivision.division_id[0] === division) {
                        subdivisionsArray.push(emp.subdivision)
                    }
                    if (emp.region.subdivision_id[0] === subdivision) {
                        regionsArray.push(emp.region)
                    }
                    if (emp.group.region_id[0] === region) {
                        groupsArray.push(emp.group)
                    }
                    if (emp.subgroup.group_id[0] === group) {
                        subgroupsArray.push(emp.subgroup)
                    }
                })
            } else if (division && workplace && subdivision && region) {
                employeesArray = []
                resultEmployees.forEach(emp => {
                    if (emp.workplace._id === workplace && emp.division._id === division
                        && emp.subdivision._id === subdivision && emp.region._id === region) 
                    {
                        employeesArray.push(emp);
                    }
                    if (emp.division.workplace_id[0] === workplace) {
                        divisionsArray.push(emp.division)
                    }
                    if (emp.subdivision.division_id[0] === division) {
                        subdivisionsArray.push(emp.subdivision)
                    }
                    if (emp.region.subdivision_id[0] === subdivision) {
                        regionsArray.push(emp.region)
                    }
                    if (emp.group.region_id[0] === region) {
                        groupsArray.push(emp.group)
                    }
                })
            } else if (division && workplace && subdivision) {
                employeesArray = []
                resultEmployees.forEach(emp => {
                    if (emp.workplace._id === workplace && emp.division._id === division
                        && emp.subdivision._id === subdivision) 
                    {
                        employeesArray.push(emp);
                    }
                    if (emp.division.workplace_id[0] === workplace) {
                        divisionsArray.push(emp.division)
                    }
                    if (emp.subdivision.division_id[0] === division) {
                        subdivisionsArray.push(emp.subdivision)
                    }
                    if (emp.region.subdivision_id[0] === subdivision) {
                        regionsArray.push(emp.region)
                    }
                })
            } else if (division && workplace) {
                employeesArray = []
                resultEmployees.forEach(emp => {
                    if (emp.workplace._id === workplace && emp.division._id === division) {
                        employeesArray.push(emp);
                    }
                    if (emp.division.workplace_id[0] === workplace) {
                        divisionsArray.push(emp.division)
                    }
                    if (emp.subdivision.division_id[0] === division) {
                        subdivisionsArray.push(emp.subdivision)
                    }
                })
            } else {
                resultEmployees.forEach(emp => {
                    if (emp.workplace._id === workplace) {
                        employeesArray.push(emp);
                    }
                    if (emp.division.workplace_id[0] === workplace) {
                        divisionsArray.push(emp.division)
                    }
                })
            }
            if (employeesArray.length > 0) {
                resultEmployees = employeesArray
            }
        }
        if(req.query.search) {
            const searchTxt = req.query.search;
            Employee.find({ name: { $regex: searchTxt, $options: "i" } }, function(err, docs) {
                resultEmployees = docs
                const total = resultEmployees.length;
                const employeesAll = resultEmployees;
                const pages = Math.ceil(total / limit);
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
                const employees = resultEmployees.slice(startIndex, endIndex);
                const search = 1;
                res.status(200).json({ total: total , last_page: pages, per_page: limit, employees, employeesAll, search});
            });
        }
        else {
            const total = resultEmployees.length;
            const employeesAll = resultEmployees;
            const pages = Math.ceil(total / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const employees = resultEmployees.slice(startIndex, endIndex);
            if (divisionsArray.length > 0 || subdivisionsArray.length > 0 || regionsArray > 0 || groupsArray > 0 || subgroupsArray > 0) {
                const divisions = divisionsArray;
                const subdivisions = subdivisionsArray;
                const regions = regionsArray;
                const groups = groupsArray;
                const subgroups = subgroupsArray;
                res.status(200).json({ total: total , last_page: pages, per_page: limit, employees, employeesAll, divisions, subdivisions, regions, groups, subgroups});
            } else {
                res.status(200).json({ total: total , last_page: pages, per_page: limit, employees, employeesAll});
            }
        }
        
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Add Employees

router.post('/', upload.single('file') , async (req, res) => {
    const new_employee = new Employee({
        name: req.body.name,
        lastname: req.body.lastname,
        mobile_number: req.body.mobile_number,
        work_number: req.body.work_number,
        email: req.body.email,
        avatar: req.file.filename,
        gender: req.body.gender,
        position: req.body.position,
        workplace: JSON.parse(req.body.workplace),
        subdivision: JSON.parse(req.body.subdivision),
        division: JSON.parse(req.body.division),
        region: JSON.parse(req.body.region),
        group: JSON.parse(req.body.group),
        subgroup: JSON.parse(req.body.subgroup)
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

router.patch('/:employeeId', upload.single('file'), async (req, res) => {
    try {
        const updateEmployee = await Employee.updateOne(
            {_id: req.params.employeeId}, 
            {$set: {
                name: req.body.name,
                lastname: req.body.lastname,
                mobile_number: req.body.mobile_number,
                work_number: req.body.work_number,
                email: req.body.email,
                avatar: req.file.filename,
                gender: req.body.gender,
                position: req.body.position,
                workplace: JSON.parse(req.body.workplace),
                subdivision: JSON.parse(req.body.subdivision),
                division: JSON.parse(req.body.division),
                region: JSON.parse(req.body.region),
                group: JSON.parse(req.body.group),
                subgroup: JSON.parse(req.body.subgroup)
            }}
        );
        res.status(200).json(updateEmployee).send("Vartotojas atnaujintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

router.use(function(err, req, res, next) {
    if(err.code === "LIMIT_FILE_TYPES") {
        console.log(err)
        res.status(422).json({error: "Galimi nuotraukos formatai - .jpg .jpeg .png"})
        return
    }
    
    if(err.code === "LIMIT_FILE_SIZE") {
        console.log(err)
        res.status(422).json({error: `Failas per didelis. Didžiausias failo dydis ${MAX_SIZE/1000}Kb`})
        return
    }
})

// Functions

module.exports = router;