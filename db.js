const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./logger');
dotenv.config();

const connectDB = () => {
    // @ts-ignore
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        logger.info('🚀 Database connected');
    }).catch((err) => {
        logger.error(`🚀 Error connecting to database: ${err}`);
    });
}
module.exports = connectDB;