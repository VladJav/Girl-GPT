require('dotenv').config({ path: `${__dirname}/../.env` });
require('express-async-errors');

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const connectDb = require('./db/connect');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const messageRouter = require('./routes/messageRoutes');

const { authenticateUser } = require('./middleware/authentication');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_REFRESH_SECRET));
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/message', messageRouter);
app.get('/', authenticateUser, (req, res) => {
    res.send('Girl GPT');
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async ()  => {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT,() => {
        console.log(`Server is listening on port ${PORT}...`);
    });
};

start();