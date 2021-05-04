const express = require('express');

const router = express.Router()

// Controllers
const uploadController = require('../controller/uploadController');


// INITIAL ROUTE
router.get('/', async (req, res) => {
    res.json({
        'status': 'error',
        'message': 'Unknown route'
    });
});

router.get('/api', async (req, res) => {
    res.json({
        'status': 'error',
        'message': 'Unknown route'
    });
});

/**
 * Route Students CRUD
 * */
router.post('/imageSaveCropped', uploadController.imageSaveCropped);
router.post('/imageSaveCanvased', uploadController.imageSaveCanvased);


module.exports = router;