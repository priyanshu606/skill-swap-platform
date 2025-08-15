const express = require('express');
const {handleSignupUser,handleLoginUser} = require('../controllers/signupUser')
const {handleUpdateUser,handleGetUser} = require('../controllers/userProfile')
const {handleGetAllUser} = require('../controllers/allPublicUser')
const {authMiddleware} = require('../middleware/authMiddleware')
const {handleSwapRequest,getAllSendRequest} = require('../controllers/swapRequest')
const router = express.Router();

// routing for login and signup
router.post('/signup',handleSignupUser);
router.post('/login', handleLoginUser);

// profile routing
router.put('/update/:id', authMiddleware, handleUpdateUser);
router.get('/get/user/:id',authMiddleware,handleGetUser);

// get all public user
router.get('/get/all/users',handleGetAllUser);

//swap request routing
router.post('/user/swap-request',authMiddleware,handleSwapRequest);
router.get('/get/all/request',authMiddleware,getAllSendRequest);

module.exports = router;