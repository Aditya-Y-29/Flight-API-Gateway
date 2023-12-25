const express = require('express');
const {UserController}= require('../../controllers')
const router=express.Router();
const {AuthMiddleware}=require('../../middlewares')

router.post('/signup', AuthMiddleware.validateAuthRequest,
            UserController.signup);

router.post('/signin', AuthMiddleware.validateAuthRequest,
            UserController.signin);

module.exports=router
