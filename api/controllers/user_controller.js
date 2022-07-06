const express = require('express')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const Config = require('./config')
const model = require('../models/index')

const multer = require('multer');
const { Error } = require('sequelize')

const User = model.User;
const UserPiece = model.UserPiece;
const ArtPiece = model.ArtPiece;

const { secretKey, expiredAfter } = Config;


const router = express.Router();


//FIND ALL USERS
router.get('/', (req, res) => {
    User.findAll()
        .then(user => res.status(200).json({ ok: true, data: user }))
        .catch(err => res.status(400).json({ ok: false, data: err }))
})

//FIND A USER
router.get('/:alias', (req, res) => {
    const { alias } = req.params;
    User.findOne({ where: { alias } })
        .then(user => res.status(200).json({ ok: true, data: user }))
        .catch(err => res.status(400).json({ ok: false, data: err }))
})

//FINDS THE ART PIECES OF AN ARTIST GIVEN AN ID
router.get('/art/creator/:id', (req, res) => {
    const { id } = req.params;
    UserPiece.findAll({ where: { id_creator: id } })
        .then(resp => {
            const idsPieces = resp.map(el => (el.id_piece))
            ArtPiece.findAll({ where: { id: idsPieces } })
                .then(resp => res.status(200).json({ ok: true, data: resp }))
                .catch(err => res.status(400).json({ ok: false, data: err }))
        })
})

//FINDS THE PIECES THAT BELONGS TO A GIVEN ID
router.get('/art/owner/:id', (req, res) => {
    const { id } = req.params;
    UserPiece.findAll({ where: { id_current_owner: id } })
        .then(resp => {
            const idsPieces = resp.map(el => (el.id_piece))
            ArtPiece.findAll({ where: { id: idsPieces } })
                .then(resp => res.status(200).json({ ok: true, data: resp }))
                .catch(err => res.status(400).json({ ok: false, data: err }))
        })
})


//REGISTER A USER
router.post('/register', function (req, res, next) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    console.log(req.body.password)
    req.body.password = hash;
    User.create(req.body)
        .then(item => res.json({ ok: true, data: item }))
        .catch((error) => res.json({ ok: false, error }))
});

//LOGIN
router.post('/login', (req, res) => {
    const response = {};
    const { username, password } = req.body;
    console.log(username, password)

    if (!username || !password) {

        return res.status(400).json({ ok: false, msg: "email or password not received" })
    }

    User.findOne({ where: { username } })
        .then((user) => {

            if (user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                throw "username or password invalids";
            }
        })
        .then(usuari => {
            response.token = jsonwebtoken.sign(
                {
                    expiredAt: new Date().getTime() + expiredAfter,
                    username: usuari.username,
                    id: usuari.id,
                    role: usuari.role
                },
                secretKey
            );
            response.ok = true;
            res.json(response)
        })
        .catch(err => res.status(400).json({ ok: false, msg: err }))
});

module.exports = router;