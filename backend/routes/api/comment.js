const express = require('express')
const router = express.Router();
const { Album, Artist, Comment, Image, Playlist, Song, SP, User } = require('../../db/models')
const { Op } = require('sequelize')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


const validateComment = [
  check('comment')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a comment.'),
  handleValidationErrors
];



// Get all Comments by Song ID
router.get('/songs/:songId', requireAuth, async (req, res, next) => {
  const { songId } = req.params;
  const result = await Comment.findAll({
    where: { songId },
    include: { model: User.scope(['userOnly']) }
  });
  if(!check) {
      const err = new Error(`Song couldn't be found.`)
      err.title = 'Missing Item'
      err.status = 404
      return next(err)
    }


  res.status(200)
  res.json(result)
});


// Edit a comment
router.put('/:commentId', requireAuth, validateComment, async (req, res, next) => {
  const { comment } = req.body;
  const { commentId } = req.params;
  const { id } = req.user;
  const result = await Comment.findByPk(commentId);
  if(!result) {
    const err = new Error(`Comment couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }
  if(result.userId !== id) {
    const err = new Error(`You are not the Owner if this Comment.`)
    err.title = 'Unauthorized'
    err.status = 403
    return next(err)
  }

  result.comment = comment;

  await result.save();

  res.status(200)
  return res.json({
    message: 'Edit Successful',
    result
  });

});


// Create a Song in an Album
router.post('/songs/:songId', requireAuth, validateComment, async (req, res, next) => {
  const { comment } = req.body;
  const { songId } = req.params;
  const { id } = req.user;
  const check = await Song.findByPk(songId);
  if(!check) {
      const err = new Error(`Song couldn't be found.`)
      err.title = 'Missing Item'
      err.status = 404
      return next(err)
    }

  const result = await Comment.create({
      userId: id,
      songId,
      comment
  });

  res.status(200)
  res.json(result)
});


// Delete a comment
router.delete('/:commentId', requireAuth, async (req, res, next) => {
  const { commentId } = req.params;
  const { id } = req.user;
  const result = await Comment.findByPk(commentId);
  if(!result) {
    const err = new Error(`Comment couldn't be found.`)
    err.title = 'Missing Item'
    err.status = 404
    return next(err)
  }
  if(result.userId !== id) {
    const err = new Error(`You are not the Owner if this Comment.`)
    err.title = 'Unauthorized'
    err.status = 403
    return next(err)
  }

  await result.destroy();

  res.status(200)
  return res.json({
    message: 'Successfully Deleted!'
  });

});



module.exports = router;
