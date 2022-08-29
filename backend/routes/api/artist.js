const express = require('express')
const router = express.Router();
const { Album, Artist, Comment, Image, Playlist, Song, SP, User, sequelize } = require('../../db/models')
const { Op } = require('sequelize')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');



// Get all Songs of an Artist by Artist ID
router.get('/:artistId/songs', async (req, res, next) => {
  const { artistId } = req.params;
  const result = await Song.findAll({
    where: { artistId }
  });


  if(!result) {
    const err = new Error(`Artist not Found.`)
    err.title = 'Missing Artist'
    err.status = 404
    return next(err)
  }


  res.status(200)
  res.json({ Songs: result });

});


// Get all Albums of an Artist by Artist ID
router.get('/:artistId/albums', async (req, res, next) => {
  const { artistId } = req.params;
  const result = await Album.findAll({
    where: { artistId }
  });


  if(!result) {
    const err = new Error(`Artist not Found.`)
    err.title = 'Missing Artist'
    err.status = 404
    return next(err)
  }


  res.status(200)
  res.json({ Albums: result });

});


// Get all Playlists of an Artist by Artist ID
router.get('/:artistId/playlists', async (req, res, next) => {
  const { artistId } = req.params;
  const checker = await User.findByPk(artistId)
  if(!checker) {
    const err = new Error(`Artist does not exist.`)
    err.title = 'Missing Artist'
    err.status = 404
    return next(err)
  }


  const result = await Playlist.findAll({
    include: {
      model: Song,
      where: { artistId },
      through: { attributes: [] }
    }
  });


  if(!result.length) {
    const err = new Error(`No Playlists for this Artist.`)
    err.title = 'Missing Playlists'
    err.status = 404
    return next(err)
  }


  res.status(200)
  res.json({ Albums: result });

});


// Get datils of an Artist by ID
router.get('/:artistId', async (req, res, next) => {
  const { artistId } = req.params;
  const result = await User.scope(['userOnly']).findByPk(artistId, {
      include: {
        model: Song, as: 'Songs',
        attributes: []
      },
      attributes: [
        'id',
        'username',
        [sequelize.fn('count', sequelize.col('artistId')), 'totalSongs'],
        [sequelize.fn('count', sequelize.col('albumId')), 'totalAlbums'],
        'imageURL'
      ],
      raw: true
  });

  const albums = await Album.findAll({
    where: { artistId },
    attributes: [[sequelize.fn('count', sequelize.col('artistId')), 'totalAlbums']],
    raw: true
  });
  if(!result.id) {
    const err = new Error(`Artist not Found.`)
    err.title = 'Missing Artist'
    err.status = 404
    return next(err)
  }

  result.totalAlbums = albums[0].totalAlbums

  res.status(200)
  res.json(result);

});





module.exports = router;
