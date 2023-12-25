const express =require('express');
const {ServerConfig, Logger}=require('./config');

const apiRoutes = require('./routes')

const app=express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api',apiRoutes)

app.listen(ServerConfig.PORT,()=>{
    console.log(`successfully started server at ${ServerConfig.PORT}`);
    Logger.info({
        level: 'info',
        message: 'Hello distributed log files!'
    });
})