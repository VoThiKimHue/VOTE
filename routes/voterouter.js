const express = require('express');
const router = express.Router();
const votecontroller = require('../controllers/votecontroller');

router.post('/polls', votecontroller.createPoll);

module.exports = router;