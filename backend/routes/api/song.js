const express = require('express')
const router = express.Router();
const { Album, Artist, Comment, Image, Playlist, Song, SP, User } = require('../../db/models')
const { Op } = require('sequelize')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


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

const validateQuery = [
  check('page')
    .optional()
    .isNumeric()
    .withMessage('Must be a Number'),
  check('size')
    .optional()
    .isNumeric()
    .withMessage('Must be a Number'),
  handleValidationErrors
]


// Edit a Song
router.put('/:songId', requireAuth, validateSong, async (req, res, next) => {
  const { id } = req.user;
  const { title, description, url, imageURL } = req.body;
  const { songId } = req.params;
  const result = await Song.findByPk(songId);
  if(!result) {
    const err = new Error(`Song couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }
  if(result.artistId !== id) {
    const err = new Error(`Song is not yours.`)
    err.title = 'Unauthorized'
    err.status = 403
    return next(err)
  }

  result.title = title;
  result.description = description;
  result.url = url;
  result.imageURL = imageURL;

  await result.save()

  return res.json({
    message: 'Success',
    result
  });
});


// Get details of a Song
router.get('/:songId', async (req, res, next) => {
  const { songId } = req.params;
  const result = await Song.findByPk(songId, {
    include: [
      { model: User, as: 'Artist' },
      { model: Album.scope(['preview']), as: 'Album' }
    ]
  });
  if(!result) {
    const err = new Error(`Song couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }
  return res.json(result);
});


// Get all Songs by current User
router.get('/current', requireAuth, async (req, res) => {
  const { id } = req.user;
  const result = await Song.findAll({
    where: { artistId: id}
  });
  res.status(200)
  res.json(result);
});


// Get all Songs
router.get('/', validateQuery, async (req, res, next) => {
  let { page, size, songTitle, artist, albumTitle, createdAt } = req.query;
  let pagination = {};
  page = page === 0 ? 0 : parseInt(page)
  size = size === 0 ? 20 : parseInt(size)

  page = !Number(page) ? 0 : parseInt(page)
  size = !Number(size) ? 20 : parseInt(size)

  page = page === undefined ? 0 : parseInt(page)
  size = size === undefined ? 20 : parseInt(size)

  if (size >= 0 && page >= 0 && size <= 20) {
    pagination.limit = size
    pagination.offset = size * (page)
  }
  if (size > 20) {
    pagination.limit = 20
    pagination.offset = size * (page)
  }

  // const checkNum = (query) => {
  //     if(!Number(query)){
  //         const err = new Error(
  //             `Please provide a valid number in query.`
  //             )
  //         err.status = 400
  //         return next(err)
  //     }
  //     return
  // }

  // if (page) { checkNum(page) };
  // if (size) { checkNum(size) };
  const queries = {};
  const advSearch = {...pagination}
  const whereClause = {}
  if (songTitle) {
    advSearch.where = whereClause
    whereClause.title = { [Op.substring]: songTitle }
  };
  if (artist) {
    advSearch.includes = { model: User, where: whereClause }
    // advSearch.where = whereClause
    whereClause.username = artist
  };
  if (albumTitle) {
    // whereClause.title = { [Op.substring]: albumTitle }
    advSearch.includes = { model: Album, where: { [Op.substring]: albumTitle } }
  };
  if (createdAt) {
    advSearch.where = whereClause
    whereClause.createdAt = { [Op.substring]: createdAt }
  };

  console.log(advSearch)

  let result = await Song.findAll(advSearch)

  size = result.length
  res.json({
      page,
      size,
      result
  })
});


// Create a Song in an Album
router.post('/albums/:albumId', requireAuth, validateSong, async (req, res, next) => {
    const { title, description, url, imageURL } = req.body;
    const { albumId } = req.params;
    const { id } = req.user;
    const check = await Album.findByPk(albumId);
    if(!check) {
        const err = new Error(`Album couldn't be found.`)
        err.title = 'Missing Item'
        err.status = 404
        return next(err)
      }
    if(check.artistId !== id) {
      const err = new Error(`You are not the owner if this Album.`)
      err.title = 'Unauthorized'
      err.status = 403
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


// Delete a Song
router.delete('/:songId', async (req, res, next) => {
  const { id } = req.user;
  const { songId } = req.params;
  const result = await Song.findByPk(songId);
  if(!result) {
    const err = new Error(`Song couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }
  if(result.artistId !== id) {
    const err = new Error(`Song is not yours.`)
    err.title = 'Unauthorized'
    err.status = 403
    return next(err)
  }

  await result.destroy()
  res.json({
    message: 'Deleted Successfully'
  });
});

module.exports = router;
