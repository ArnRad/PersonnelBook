const router = require ('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../../validation');

router.post('/register', async (req, res) => {

    //Validate user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check user email
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    if(req.body.email !== req.body.confirmed_email) return res.status(400).send('Confirmed email must match!');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create user
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        confirmed_email: req.body.confirmed_email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {

    //Validate user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user name exists
    const user = await User.findOne({name: req.body.name});
    if(!user) return res.status(400).json({error: "Neteisingas vartotojo vardas!"});
    

    //Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({error: "Neteisingas vartotojo slaptažodis!"});

    //Create and assing a token
    const token = jwt.sign({
        user: user
    }, process.env.TOKEN_SECRET);

    res.header('access_token', token).send(token);
});

module.exports = router;