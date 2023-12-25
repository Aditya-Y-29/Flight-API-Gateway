const express =require('express');
const {serverConfig, logger}=require('./config');

const apiRoutes = require('./routes')

const app=express()

app.use('/api',apiRoutes)

app.listen(serverConfig.PORT,()=>{
    console.log(`successfully started server at ${serverConfig.PORT}`);
    logger.info({
        level: 'info',
        message: 'Hello distributed log files!'
    });
})