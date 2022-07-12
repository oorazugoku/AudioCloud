const express = require('express')
const router = express.Router();
const { Album, Artist, Comment, Image, Playlist, Song, SP, User } = require('../../db/models')
const { Op } = require('sequelize')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


const validatePlaylist = [
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid Name for your Playlist.'),
  handleValidationErrors
];



// Add Song to a Playlist by Playlist ID
router.post('/:playlistId', requireAuth, async (req, res, next) => {
  const { playlistId } = req.params;
  const { songId } = req.body;
  const { id } = req.user;

  const check = await Playlist.findByPk(playlistId)
  const song = await Song.findByPk(songId)
  if(!check) {
    const err = new Error(`Playlist couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }
  if(!song) {
    const err = new Error(`Song couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }
  if(check.userId !== id) {
    const err = new Error(`Playlist is not yours.`)
    err.title = 'Unauthorized'
    err.status = 403
    return next(err)
  }

  const result = await SP.findOne({
    where: { playlistId, songId}
  });
  if(result) {
    const err = new Error(`This Song is already in your Playlist.`)
    err.title = 'Look again!'
    err.status = 404
    return next(err)
  }

  await SP.create({
    playlistId: check.id,
    songId: song.id
  });

  const result2 = await SP.findOne({
    where: { playlistId, songId}
  });

  res.status(200)
  res.json(result2);

});


// Get all Playlists of current User
router.get('/current', requireAuth, async (req, res, next) => {
  const { id } = req.user;

  const result = await Playlist.findAll({
    where: { userId: id }
  });

  if(!result) {
    const err = new Error(`Playlist couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }

  res.status(200)
  res.json(result);

});


// Get all Playlists of current User
router.get('/:playlistId', requireAuth, async (req, res, next) => {
  const { id } = req.user;
  const { playlistId } = req.params;

  const result = await Playlist.findByPk(playlistId, {
    include: { model: Song, through: { attributes: []} }
  });
  if(!result) {
    const err = new Error(`Playlist couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }
  if(result.userId !== id) {
    const err = new Error(`Playlist does not belong to you.`)
    err.title = 'Unauthorized'
    err.status = 403
    return next(err)
  }

  res.status(200)
  res.json(result);

});


// Create a Playlist
router.post('/', requireAuth, validatePlaylist, async (req, res) => {
  const { name, imageURL } = req.body;
  const { id } = req.user;

  const result = await Playlist.create({
      userId: id,
      name,
      imageURL
  });

  res.status(200)
  res.json(result)
});


// Edit a Playlist
router.put('/:playlistId', requireAuth, validatePlaylist, async (req, res, next) => {
  const { name, imageURL } = req.body;
  const { playlistId } = req.params;
  const { id } = req.user;

  const result = await Playlist.findByPk(playlistId);
  if(!result) {
    const err = new Error(`Playlist couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }
  if(result.userId !== id) {
    const err = new Error(`Playlist is not yours.`)
    err.title = 'Unauthorized'
    err.status = 403
    return next(err)
  }

  if (name) result.name = name
  if (imageURL) result.imageURL = imageURL;

  await result.save();

  res.status(200)
  res.json({
    message: `Edit Successful!`,
    result
  });

});


// Delete a Playlist
router.delete('/:playlistId', requireAuth, async (req, res, next) => {
  const { playlistId } = req.params;
  const { id } = req.user;

  const result = await Playlist.findByPk(playlistId);
  if(!result) {
    const err = new Error(`Playlist couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }
  if(result.userId !== id) {
    const err = new Error(`Playlist is not yours.`)
    err.title = 'Unauthorized'
    err.status = 403
    return next(err)
  }

  await result.destroy();

  res.status(200)
  res.json({
    message: `Successfully Deleted!`
  });

});




module.exports = router;
