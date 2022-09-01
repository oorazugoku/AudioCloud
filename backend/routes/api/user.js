const express = require('express')
const router = express.Router();
const { User } = require('../../db/models')
const { Op } = require('sequelize')


// Get all users
router.post('/all', async (req, res) => {
    const result = await User.findAll();
    return res.json({
      result
    });
  }
);


module.exports = router;
