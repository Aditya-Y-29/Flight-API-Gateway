const express = require('express');
const {UserController}= require('../../controllers')
const router=express.Router();
const {AuthMiddleware}=require('../../middlewares')

router.post('/signup', AuthMiddleware.validateAuthRequest,
            UserController.signup);

router.post('/signin', AuthMiddleware.validateAuthRequest,
            UserController.signin);

router.post('/role', AuthMiddleware.checkAuth, AuthMiddleware.isAdmin,
            UserController.addRoleToUser);

module.exports=router
