const express = require('express');
const Employee = require('../../models/Employee');

const router = express.Router();

// Update email

router.patch('/email', (req, res) => {
    try {
        let userName = req.body.name

        let conditions = {
            name: userName
        }

        let update = {
            email: req.body.email,
            confirmed_email: req.body.confirmed_email
        }

        Employee.findOneAndUpdate(conditions,update,function(error, result){
            if(error){
                console.log('eroras' + error)
            } else{
                console.log('resultatas ' + result)
            }
        })
        res.status(200).send("Vartotojo el.paštas pakeistas");
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err})
    }
});

// Function


module.exports = router;