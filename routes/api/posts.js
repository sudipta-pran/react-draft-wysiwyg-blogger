const express = require('express')
const router = express.Router()

const Post = require('../../models/Post')

//routes get all posts
router.get('/', (req, res) => {
    Post.find()
    .then(posts => res.json(posts))
})

//routes get single post
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.json("Error: ", err))
})

//routes post a post
router.post('/', (req, res) => {
    console.log(req.body)
    const newPost = new Post({
        title: req.body.title,
        description: req.body.description
    })

    newPost.save()
    .then(post => res.json(post))
    .catch(err => res.status(500).json({"Error": err}))
})

//routes Update a post
router.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, post) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(post);
        }
    )
})

module.exports = router