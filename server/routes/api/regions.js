const express = require('express');
const Region = require('../../models/Region');

const router = express.Router();

// GET Region
router.get('/', async (req, res) => {
    try {
        const region = await Region.find();
        res.status(200).json({region});
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Add Region

router.post('/', async (req, res) => {
    try {
        for (let i = 0; i < req.body.subdivision.length; i++) {
            const new_region = new Region({
                name: req.body.name,
                subdivision_id: req.body.subdivision[i]._id,
                subdivision: req.body.subdivision[i]
            });
            const savedRegion = await new_region.save();
        }
        res.status(200).send("Regionas pridėtas!");
    } catch (err) {
        res.json({message: err});
    }
});

// Get Region

router.get('/:regionId', async (req, res) => {
    try{
        const region = await Region.findById(req.params.regionId);
        res.status(200).json(region);

    } catch (err) {
        res.status(500).json({message: err})
    }
});


// Delete Region

router.delete('/:regionId', async (req, res) => {
    try {
        const removedRegion = await Region.remove({_id: req.params.regionId});
        res.status(200).json(removedRegion).send("Regionas ištrintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Update Subdivision

router.patch('/:regionId', async (req, res) => {
    try {
        const updateRegion = await Region.updateOne(
            {_id: req.params.regionId}, 
            {$set: {
                name: req.body.name
            }}
        );
        res.status(200).json(updateRegion).send("Regionas atnaujintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Functions


module.exports = router;