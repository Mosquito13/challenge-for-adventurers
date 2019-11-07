const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT,
    dateFormat: process.env.DATE_FORMAT,
    apiKey: process.env.API_KEY
};