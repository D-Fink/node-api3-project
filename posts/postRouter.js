const express = require('express');

const router = express.Router();

const postHub = require('./postDb.js');

router.get('/', (req, res) => {
  postHub.get()
  .then(posts => {
    res.status(200).json(posts)
  })
});

router.get('/:id', validatePostId, (req, res) => {
  postHub.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  postHub.remove(req.params.id)
  .then(post => {
    res.status(200).json({message: 'post was deleted'})
  })
});

router.put('/:id', validatePostId, (req, res) => {
  postHub.update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(post)
  })
});

// custom middleware

function validatePostId(req, res, next) {
  postHub.getById(req.params.id)
  .then(post => {
    if(post) {
      req.params.id = post.id;
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

module.exports = router;
