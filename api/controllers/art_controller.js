const express = require('express')
const { sequelize, Category, ArtPiece, UserPiece, CategoryPiece, CollectionPiece } = require('../models/index')
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'artUploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).array('files');

//GET ALL CATEGORIES
router.get('/categories/all', (req, res) => {
    Category.findAll()
        .then(resp => res.status(200).json({ ok: true, data: resp }))
        .catch(err => res.status(400).json({ ok: false, data: err }))
})

//CREATE A NEW ART PIECE
router.post('/new', async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        let piece;

        if (req.files) {
            piece = {
                content: req.files[0].filename,
                title: req.body.title,
                piece_type: req.body.piece_type,
                front_page: req.files[1] ? req.files[1].filename : null,
                description: req.body.description,
                sell_price: req.body.sell_price,
            }
            // collection: req.body.collection ? req.body.collection : null
        } else {
            console.log("Algo falla: ", req.body)
            // res.status(400).json({ ok: false, data: "No se ha subido ninguna obra" })
        }

        let transaction;
        let userPiece;
        let catPiece;

        try {

            transaction = await sequelize.transaction();

            await ArtPiece.create(piece, { transaction })
                .then(resp => {
                    userPiece = {
                        id_creator: req.body.idUser,
                        id_current_owner: req.body.idUser,
                        id_piece: resp.dataValues.id
                    }

                    catPiece = {
                        id_category: req.body.category,
                        id_piece: resp.dataValues.id
                    }
                })
                .catch(err => console.log(err))

            await UserPiece.create(userPiece, { transaction })

            await CategoryPiece.create(catPiece, { transaction })
            //ADD COLLECTION


            await transaction.commit();

            res.status(200).json({ ok: true, data: "Insertado correctamente" })

        } catch (error) {
            console.log(error)
            // Rollback transaction 
            if (transaction) await transaction.rollback();
            res.status(400).json({ ok: false, data: "Error al insertar, revisa los campos" })
        }
    })
})

module.exports = router;