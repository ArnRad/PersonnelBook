const express = require('express');
const Workplace = require('../../models/Workplace');

const router = express.Router();

// GET Workplaces
router.get('/', async (req, res) => {
    try {
        const workplaces = await Workplace.find();
        const total = workplaces.length;
        res.status(200).json({ total: total , workplaces});
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Add Workplace

router.post('/', async (req, res) => {
    const new_workplace = new Workplace({
        street: req.body.street,
        number: req.body.number,
        city: req.body.city,
        country: req.body.country
    });
    try {
        const savedWorkplace = await new_workplace.save();
        res.json(savedWorkplace);
    } catch (err) {
        res.json({message: err});
    }
});

// Get Workplace

router.get('/:workplaceId', async (req, res) => {
    try{
        const workplace = await Workplace.findById(req.params.workplaceId);
        res.status(200).json(workplace);

    } catch (err) {
        res.status(500).json({message: err})
    }
});


// Delete Workplace

router.delete('/:workplaceId', async (req, res) => {
    try {
        const removedWorkplace = await Workplace.remove({_id: req.params.workplaceId});
        res.status(200).json(removedWorkplace).send("Darbovietė ištrinta");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Update Workplace

router.patch('/:workplaceId', async (req, res) => {
    try {
        const updateWorkplace = await Workplace.updateOne(
            {_id: req.params.workplaceId}, 
            {$set: {
                street: req.body.street,
                number: req.body.number,
                city: req.body.city,
                country: req.body.country
            }}
        );
        res.status(200).json(updateWorkplace).send("Darbovietė atnaujinta");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Functions


module.exports = router;