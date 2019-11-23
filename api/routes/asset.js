const express = require('express');
const router = express.Router();

// require('library/testAction');
// import { isUserExists, evaluateCert } from "library/testAction";
const testActions = require("../../library/testAction");


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

router.get('/is-user', async (req, res, next) => {
    res.status(200).json({
        message: 'User validated',
        payload: {user: await testActions.isUserExists()}
    });
});


module.exports = router;

