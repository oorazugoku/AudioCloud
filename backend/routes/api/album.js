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


// Edit and Album
router.put('/:albumId', requireAuth, validateAlbum, async (req, res, next) => {
  const { title, description, imageURL } = req.body;
  const { albumId } = req.params
  const { id } = req.user;

  const result = await Album.findByPk(albumId);
  if(!result) {
    const err = new Error(`Album couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  };
  if(result.artistId !== id) {
    const err = new Error(`You are not the Owner of this Album.`)
    err.title = 'Unauthorized'
    err.status = 403
    return next(err)
  };

  if (title) result.title = title;
  if (description) result.description = description;
  if (imageURL) result.imageURL = imageURL;

  await result.save();


  res.json(result);
});


// Get details of an Album
router.get('/:albumId', async (req, res, next) => {
  const { albumId } = req.params;
  const result = await Album.findByPk(albumId, {
    include: [
      { model: User, as: 'Artist' },
      { model: Song, as: 'Songs' }
    ]
  });
  if(!result) {
    const err = new Error(`Album couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }

  res.status(200)
  res.json(result)
});


// Create and Album
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


// Get all albums of current User
router.get('/current', requireAuth, async (req, res) => {
  const { id } = req.user;
  const result = await Album.findAll({
    where: { artistId: id}
  })

  res.status(200)
  res.json(result)
});


// Get all Albums
router.get('/', async (req, res) => {
  const result = await Album.findAll()

  res.status(200)
  res.json(result)
});


// Delete an Album
router.delete('/:albumId', requireAuth, async (req, res, next) => {
  const { albumId } = req.params
  const { id } = req.user;

  const result = await Album.findByPk(albumId);
  if(!result) {
    const err = new Error(`Album couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  };
  if(result.artistId !== id) {
    const err = new Error(`You are not the Owner of this Album.`)
    err.title = 'Unauthorized'
    err.status = 403
    return next(err)
  };

  await result.destroy();


  res.json({
    message: 'Album Delete Successful!'
  });
});



module.exports = router;
