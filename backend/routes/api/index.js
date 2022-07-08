const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./user.js');
const { User } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);


module.exports = router;
