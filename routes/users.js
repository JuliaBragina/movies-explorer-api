const router = require('express').Router();
const { validUsersMe } = require('../utils/validation');
const {
  getUserMe, updateUser,
} = require('../controllers/users');

router.get('/users/me', getUserMe);
router.patch('/users/me', validUsersMe, updateUser);

module.exports = router;
