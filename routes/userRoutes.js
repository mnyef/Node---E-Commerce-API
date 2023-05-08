const express = require('express');
const router = express.Router();

const {
  getSingleUser,
  getAllUsers,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');

router.route('/').get(getAllUsers);

router.route('/showMe').get(showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(updateUserPassword);

router.route('/:id').get(getSingleUser);

module.exports = router;
