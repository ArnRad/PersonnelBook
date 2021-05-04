const express = require('express');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../../validation');
require('dotenv').config();
const User = require('../../models/User');

const router = express.Router();

// GET User
router.get('/', async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json({users});
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Add User

router.post('/', async (req, res) => {

    req.body.password = process.env.DEFAULT_PASSWORD;

    //Check user email
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(420).send('Email already exists');
    if(req.body.email !== req.body.confirmed_email) return res.status(400).send('Confirmed email must match!');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); 

    const new_user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        confirmed_email: req.body.confirmed_email,
        password: hashedPassword,
        permissions: req.body.permissions
    });
    try {
        const savedUser = await new_user.save();
        res.json({savedUser, message: "Vartotojas pridėtas!"});
    } catch (err) {
        res.json({message: err});
    }
});

// Get User

router.get('/:userId/edit', async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({message: err})
    }
});


// Delete User

router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({_id: req.params.userId});
        res.status(200).json(removedUser).send("Vartotojas ištrintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

// Update User

router.patch('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const updateUser = await User.updateOne(
            {_id: req.params.userId}, 
            {$set: {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                confirmed_email: req.body.confirmed_email,
                password: user.password,
                permissions: req.body.permissions
            }}
        );
        res.status(200).json(updateUser).send("Vartotojas atnaujintas");
    } catch (err) {
        res.status(500).json({message: err})
    }
});

router.post('/changepass', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); 

    const updateUser = await User.updateOne(
        { name: req.body.name }, 
        { password: hashedPassword });
        
    res.status(200).send({message: "Slaptažodis sėkmingai pakeistas!"});
});

router.post('/changemail', async (req, res) => {

    const updateUser = await User.updateOne(
        { name: req.body.name }, 
        { email: req.body.email, confirmed_email: req.body.confirmed_email });
        
    res.status(200).send({message:"El. paštas sėkmingai pakeistas!"});
});

// Functions



module.exports = router;