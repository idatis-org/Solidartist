const express = require('express')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const Config = require('./config')
const model = require('../models/index')

const User = model.User;

const router = express.Router();

//FIND ALL ARTISTS
router.get('/get/artists', (req, res) => {
    User.findAll({ where: { role: 1 } })
        .then(user => res.status(200).json({ ok: true, data: user }))
        .catch(err => res.status(400).json({ ok: false, data: err }))
})

//FIND ALL BUYERS
router.get('/get/buyers', (req, res) => {
    User.findAll({ where: { role: 2 } })
        .then(user => res.status(200).json({ ok: true, data: user }))
        .catch(err => res.status(400).json({ ok: false, data: err }))
})

module.exports = router;

