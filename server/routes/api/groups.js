const express = require('express');
const Group = require('../../models/Group');
const Region = require('../../models/Region');

const router = express.Router();

// GET Group
router.get('/', async (req, res) => {
    try {
        let group = await Group.find();
        for (let i = 0; i < group.length; i++) {
            if(group[i].region_id) {
                let region = await Region.findById(group[i].region_id)
                group[i]['region'] = region
            }
        }
        res.status(200).json({group});
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Add Group

router.post('/', async (req, res) => {
    try {
        for (let i = 0; i < req.body.region_id.length; i++) {
            const new_group = new Group({
                name: req.body.name,
                region_id: req.body.region_id[i],
            });
            const savedGroup = await new_group.save();
        }
        res.status(200).send("Grupė pridėtas!");
    } catch (err) {
        res.json({message: err});
    }
});

// Get Group

router.get('/:groupId', async (req, res) => {
    try{
        const group = await Group.findById(req.params.groupId);
        res.status(200).json(group);

    } catch (err) {
        res.status(500).json({message: err})
    }
});


// Delete Group

router.delete('/:groupId', async (req, res) => {
    try {
        const removedGroup = await Group.remove({_id: req.params.groupId});
        res.status(200).json(removedGroup).send("Grupė ištrinta");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Update Group

router.patch('/:groupId', async (req, res) => {
    try {
        const updateGroup = await Group.updateOne(
            {_id: req.params.groupId}, 
            {$set: {
                name: req.body.name
            }}
        );
        res.status(200).json(updateGroup).send("Grupė atnaujinta!");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Functions


module.exports = router;