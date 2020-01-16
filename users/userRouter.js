const express = require('express');

const router = express.Router();

const userHub = require('./userDb.js');
const postHub = require('../posts/postDb.js')

router.post('/', (req, res) => {
  userHub.insert(req.body)
  .then(user => {
    res.status(200).json(user)
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  postHub.insert(req.params.id, req.body)
  .then(post => {
    res.status(200).json(post)
  })
});

router.get('/', (req, res) => {
  userHub.get()
  .then(users => {
    res.status(200).json(users)
  })
});

router.get('/:id', validateUserId, (req, res) => {
  userHub.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userHub.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  userHub.remove(req.params.id)
  .then(user => {
    res.status(200).json({message: 'user deleted'})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  userHub.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user)
  })
});

//custom middleware

function validateUserId(req, res, next) {
  userHub.getById(req.params.id)
  .then(users => {
    if(users) {
      req.user = users;
      next();
    }
    else {
      res.status(500).json({message: 'cannot find user'})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'missing id'})
  })
}

function validateUser(req, res, next) {
  if(req.body) {
    if(req.body.name){
      next();
    }
    else{
      res.status(400).json({message: 'name required'})
    }
  }
}

function validatePost(req, res, next) {
  if(req.body){
    if(req.body.text){
      next();
    }
    else {
      res.status(400).json({message: 'missing text'})
    }
  }
}

module.exports = router;
