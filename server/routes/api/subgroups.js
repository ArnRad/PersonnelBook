const express = require('express');
const Subgroup = require('../../models/Subgroup');

const router = express.Router();

// GET Subgroups
router.get('/', async (req, res) => {
    try {
        const subgroup = await Subgroup.find();
        res.status(200).json({subgroup});
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Add Subgroup

router.post('/', async (req, res) => {
    try {
        for (let i = 0; i < req.body.group.length; i++) {
            const new_subgroup = new Subgroup({
                name: req.body.name,
                group_id: req.body.group[i]._id,
                group: req.body.group[i]
            });
            const savedSubgroup = await new_subgroup.save();
        }
        res.status(200).send("Pogrupis pridėtas!");
    } catch (err) {
        res.json({message: err});
    }
});

// Get Subgroup

router.get('/:subgroupId', async (req, res) => {
    try{
        const subgroup = await Subgroup.findById(req.params.subgroupId);
        res.status(200).json(subgroup);

    } catch (err) {
        res.status(500).json({message: err})
    }
});


// Delete Subgroup

router.delete('/:subgroupId', async (req, res) => {
    try {
        const removedSubgroup = await Subgroup.remove({_id: req.params.subgroupId});
        res.status(200).json(removedSubgroup).send("Pogrupis ištrintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Update Subgroup

router.patch('/:subgroupId', async (req, res) => {
    try {
        const updateSubgroup = await Subgroup.updateOne(
            {_id: req.params.subgroupId}, 
            {$set: {
                name: req.body.name
            }}
        );
        res.status(200).json(updateSubgroup).send("Pogrupis atnaujintas!");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Functions


module.exports = router;