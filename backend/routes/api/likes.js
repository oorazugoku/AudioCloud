const express = require('express')
const router = express.Router();
const { Album, Artist, Comment, Image, Playlist, Song, SP, User, songLike } = require('../../db/models')
const { Op } = require('sequelize')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


// Get all likes of every song
router.get('/', requireAuth, async (req, res) => {
    const { id } = req.user;
    const result = await songLike.findAll({ where: { userId: id }});
    res.status(200)
    res.json(result);
  });

// Post a like to a song
router.post('/song/:songId', requireAuth, async (req, res, next) => {
  const { songId } = req.params;
  const { id } = req.user;
  const check = await Song.findByPk(songId)
  const checkUser = await songLike.findOne({ where: { userId: id, songId }})

  if (!check) {
      const err = new Error(`Song does not exist.`)
      err.title = 'Unauthorized'
      err.status = 403
      return next(err)
  }
  if (checkUser) {
    const err = new Error(`Already have a like.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }

  const result = await songLike.create({
      songId,
      userId: id
  });
  res.status(200)
  res.json(result);
});

  // Delete a like to a Song
  router.delete('/song/:songId', requireAuth, async (req, res, next) => {
    const { songId } = req.params;
    const { id } = req.user;
    const result = await songLike.findOne({
        where: { songId, userId: id }
    });

    if(!result) {
      const err = new Error(`No LIKE found.`)
      err.title = 'Missing Item'
      err.status = 404
      return next(err)
    }
    if(result.userId !== id) {
      const err = new Error(`Like is not yours.`)
      err.title = 'Unauthorized'
      err.status = 403
      return next(err)
    }

    await result.destroy()
    res.status(200)
    res.json({
      message: 'Deleted Successfully'
    });
  });

module.exports = router;
