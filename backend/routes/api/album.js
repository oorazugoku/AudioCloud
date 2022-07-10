const express = require('express')
const router = express.Router();
const { Album, Comment, Image, Playlist, Song, SP, User } = require('../../db/models')
const { Op } = require('sequelize')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


const validateAlbum = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Album title is required.'),
  handleValidationErrors
];


router.post('/', requireAuth, validateAlbum, async (req, res, next) => {
  const { title, description, imageURL } = req.body;
  const { id } = req.user;
  const titleCheck = await Album.findOne({
    where: { title }
  })
  if(titleCheck) {
    const err = new Error('Album title already exists.')
    err.title = 'Title Error'
    err.errors = { title: 'Title with that name already exists' }
    err.status = 403
    return next(err)
  }

  const result = await Album.create({
      artistId: id,
      title,
      description,
      imageURL
  });

  res.status(200)
  res.json(result)
});

router.get('/', async (req, res) => {
  const result = await Album.findAll()

  res.status(200)
  res.json(result)
});




module.exports = router;
