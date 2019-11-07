const express = require('express');
const cors = require('cors');

const config = require('./config');
const gasBalance = require('./controllers/gasBalance');

const app = express();

app.use(cors());

app.get('/', gasBalance);

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`);
});