const express = require('express')
const router = express.Router();
const { User, songLike } = require('../../db/models')
const { Op } = require('sequelize')


// Get all users
router.get('/', async (req, res) => {
    const result = await User.findAll({
      include: { model: songLike, as: 'Likes'}
    });
    return res.json(result);
  }
);


module.exports = router;
