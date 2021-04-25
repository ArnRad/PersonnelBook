const express = require('express');
const Subdivision = require('../../models/Subdivision');
const Division = require('../../models/Division');
const crypto = require("crypto");
const Workplace = require('../../models/Workplace');

const router = express.Router();

// GET Subdivision
router.get('/', async (req, res) => {
    try {
        let subdivision = await Subdivision.find()
        .populate('division_id')
        .populate('workplace_id')
        res.status(200).json({subdivision});
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Add Subdivision

router.post('/', async (req, res) => {
    try {
        for (let i = 0; i < req.body.division_id.length; i++) {
            const new_subdivision = new Subdivision({
                name: req.body.name,
                division_id: req.body.division_id[i],
                workplace_id: req.body.workplace_id[i]
            });
            const savedSubdivision = await new_subdivision.save();
        }
        res.status(200).send("Skyrius pridėtas!");
    } catch (err) {
        res.json({message: err});
    }
});

//Get Subdivision

router.get('/:subdivisionId', async (req, res) => {
    try{
        const subdivision = await Subdivision.findById(req.params.subdivisionId);
        res.status(200).json(subdivision);

    } catch (err) {
        res.status(500).json({message: err})
    }
});


// Delete Subdivision

router.delete('/:subdivisionId', async (req, res) => {
    try {
        const removedSubdivision = await Subdivision.remove({_id: req.params.subdivisionId});
        res.status(200).json(removedSubdivision).send("Skyrius ištrintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Update Subdivision

router.patch('/:subdivisionId', async (req, res) => {
    try {
        const updateSubdivision = await Subdivision.updateOne(
            {_id: req.params.subdivisionId}, 
            {$set: {
                name: req.body.name
            }}
        );
        res.status(200).json(updateSubdivision).send("Skyrius atnaujintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Functions


module.exports = router;