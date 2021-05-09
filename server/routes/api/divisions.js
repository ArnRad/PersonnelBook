const express = require('express');
const Division = require('../../models/Division');
const Workplace = require('../../models/Workplace');
const crypto = require("crypto");

const router = express.Router();

// GET Division
router.get('/', async (req, res) => {
    try {
        let divisions = await Division.find()
        .populate('workplace_id')
        res.status(200).json({divisions})
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Add Division

router.post('/', async (req, res) => {
    try {
        for (let i = 0; i < req.body.workplace_id.length; i++) {
            const new_division = new Division({
                name: req.body.name,
                workplace_id: req.body.workplace_id[i]
            });
            const savedDivision = await new_division.save();
            res.json(savedDivision).status(200).send("Padalinys pridėtas!");
        }
    } catch (err) {
        res.json({message: err});
    }
});

// Get Division

router.get('/:divisionId', async (req, res) => {
    try{
        const division = await Division.findById(req.params.divisionId);
        res.status(200).json(division);

    } catch (err) {
        res.status(500).json({message: err})
    }
});


// Delete Division

router.delete('/:divisionId', async (req, res) => {
    try {
        const removedDivision = await Division.remove({_id: req.params.divisionId});
        res.status(200).json(removedDivision).send("Padalinys ištrintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Update Division

router.patch('/:divisionId', async (req, res) => {
    try {
        const updateDivision = await Division.updateOne(
            {_id: req.params.divisionId}, 
            {$set: {
                name: req.body.name
            }}
        );
        res.status(200).json(updateDivision).send("Padalinys atnaujintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Functions


module.exports = router;