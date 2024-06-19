const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/welcome.html'));
});

router.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, './../views/game.html'));
});

module.exports = router;
