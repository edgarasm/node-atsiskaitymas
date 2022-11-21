require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mainRouter = require('./src/router/mainRouter');
const socketRouter = require('./src/router/socketRouter');
const mongoose = require('mongoose');
const port = process.env.PORT || 5001;
const http = require('http').createServer(app);
const socketIo = require('socket.io');

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error', error);
  });

const io = socketIo(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

app.use('/', mainRouter);

http.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.set('socketio', io);
socketRouter(io);
