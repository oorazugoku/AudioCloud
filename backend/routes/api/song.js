const express = require('express')
const router = express.Router();
const { Album, Artist, Comment, Image, Playlist, Song, SP, User } = require('../../db/models')
const { Op } = require('sequelize')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');


const validateSong = [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Song title is required.'),
  check('url')
    .exists({ checkFalsy: true })
    .withMessage('Audio is required.'),
  handleValidationErrors
];



router.get('/', async (req, res, next) => {
    const result = await Song.findAll();
    return res.json(result);
  }
);

router.post('/albums/:albumId', validateSong, async (req, res, next) => {
    const { title, description, url, imageURL } = req.body;
    const { albumId } = req.params;
    const { id } = req.user;
    const check = await Album.findByPk(albumId)
    if(!check) {
        const err = new Error(`Album couldn't be found.`)
        err.title = 'Missing Item'
        err.status = 404
        return next(err)
      }

    const result = await Song.create({
        artistId: id,
        albumId,
        title,
        description,
        url,
        imageURL
    });

    res.status(201)
    res.json(result)
});



module.exports = router;
