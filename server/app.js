require('dotenv').config({path: `${__dirname}/../.env`});
require('express-async-errors');

const express = require('express');
const app = express();

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

const PORT = process.env.PORT || 8000;


app.get('/',(req, res) => {
    res.send('Girl GPT');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT,() => {
    console.log(`Server is listening on port ${PORT}...`);
});