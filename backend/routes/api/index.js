const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./user.js');
const albumsRouter = require('./album.js');
const artistsRouter = require('./artist.js');
const commentsRouter = require('./comment.js');
const playlistsRouter = require('./playlist.js');
const songsRouter = require('./song.js');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/albums', albumsRouter);
router.use('/artists', artistsRouter);
router.use('/comments', commentsRouter);
router.use('/playlists', playlistsRouter);
router.use('/songs', songsRouter);



module.exports = router;
