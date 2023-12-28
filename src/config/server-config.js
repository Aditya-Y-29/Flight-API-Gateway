const dotenv = require('dotenv');
const path = require('path');

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({path: envPath})


module.exports={
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    FLIGHT_SEARCH_SERVICE: process.env.FLIGHT_SEARCH_SERVICE,
    FLIGHT_BOOKING_SERVICE: process.env.FLIGHT_BOOKING_SERVICE
}