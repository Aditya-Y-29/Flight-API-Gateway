const express = require('express');
const router=express.Router();
const {InfoController}=require('../../controllers');
const userRoutes=require('./user-routes')
const {AuthMiddleware}=require('../../middlewares')

router.get('/info',AuthMiddleware.checkAuth,InfoController.info)
router.use('/user',userRoutes)

module.exports=router