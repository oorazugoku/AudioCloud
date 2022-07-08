const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];



// Login
router.post('/login', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });
  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }
  const token = await setTokenCookie(res, user);
  return res.json({
    user,
    token
  });
});


// Logout
router.delete('/logout', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});


// Signup
router.post('/signup', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const user = await User.signup({ firstName, lastName, email, username, password });

    const token = await setTokenCookie(res, user);

    return res.json({
      user,
      token
    });
  }
);


// Restore session user
router.get('/current', restoreUser, async (req, res) => {
  const { user } = req;
  const token = await setTokenCookie(res, user)
  if (user) {
    return res.json({
      user: user.toSafeObject(),
      token
    });
    } else return res.json({});
  }
);



module.exports = router;
