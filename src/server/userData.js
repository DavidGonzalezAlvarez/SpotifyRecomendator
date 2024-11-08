const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/get/user', (req, res) => {
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;

    const options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).json({ userData: body });
        } else {
            res.status(404);
        }
    });
});

module.exports = router;