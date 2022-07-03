const express = require('express')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const Config = require('./config')
const model = require('../models/index')

const multer = require('multer');

const User = model.User;

const { secretKey, expiredAfter } = Config;


const router = express.Router();


//FIND ALL USERS
router.get('/', (req, res) => {
    User.findAll()
        .then(user => res.status(200).json({ ok: true, data: user }))
        .catch(err => res.status(400).json({ ok: false, data: err }))
})

//REGISTER A USER
router.post('/register', function (req, res, next) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    User.create(req.body)
        .then(item => res.json({ ok: true, data: item }))
        .catch((error) => res.json({ ok: false, error }))
});

module.exports = router;