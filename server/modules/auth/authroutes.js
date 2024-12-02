const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('./authcontroller');

const router = express.Router();

router.post(
  '/register',
  [
    body('firstname').not().isEmpty(),
    body('lastname').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('address').not().isEmpty(),
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  login
);

module.exports = router;
