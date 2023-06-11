require('dotenv').config({ path: `${__dirname}/../.env` });
require('express-async-errors');

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const connectDb = require('./db/connect');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const messageRouter = require('./routes/messageRoutes');
const chatRouter = require('./routes/chatRoutes');

const { authenticateUser } = require('./middleware/authentication');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

const app = express();
const PORT = process.env.PORT || 8000;


app.use(morgan('tiny'));
app.use(cors({ origin: 'https://frabjous-biscochitos-52f526.netlify.app' }));
app.use(cookieParser(process.env.JWT_REFRESH_SECRET));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/chat', chatRouter);

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