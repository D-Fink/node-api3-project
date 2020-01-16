const express = require('express');

const server = express();
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(logger);
server.use('/api/user', userRouter);
server.use('/api/post', postRouter);
server.use(express.json());

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}

module.exports = server;
