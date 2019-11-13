const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests to /api'
    });
});


router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST requests to /api'
    });
});


module.exports = router;

