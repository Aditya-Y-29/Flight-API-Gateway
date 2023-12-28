const express =require('express');
const { rateLimit } = require('express-rate-limit')
const { createProxyMiddleware } = require('http-proxy-middleware');

const {ServerConfig, Logger}=require('./config');
const apiRoutes = require('./routes')

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // max 100 request allowed in 10 minutes
	max: 100, 
})

const app=express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(limiter)

app.use('/flightSearchService', createProxyMiddleware({ target: ServerConfig.FLIGHT_SEARCH_SERVICE, changeOrigin: true, pathRewrite: {'/flightSearchService' : ''} }));
app.use('/flightBookingService', createProxyMiddleware({ target: ServerConfig.FLIGHT_BOOKING_SERVICE, changeOrigin: true, pathRewrite: {'/flightBookingService' : ''} }));
app.use('/api',apiRoutes)

app.listen(ServerConfig.PORT,()=>{
    console.log(`successfully started server at ${ServerConfig.PORT}`);
    Logger.info({
        level: 'info',
        message: 'Hello distributed log files!'
    });
})