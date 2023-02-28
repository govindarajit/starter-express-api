const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();
//posts model 
const Posts = require('../../models/Posts');

//@routes Get api/posts
//@desc Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        if(!posts) throw Error('No Items');
        res.status(200).json(posts);
    }catch(err) {
        res.status(400).json({mesg: err})
    }
});

//@routes Show api/posts/:id
//@desc Show a post
router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if(!post) throw Error('No Items');
        res.status(200).json(post);
    }catch(err) {
        res.status(400).json({mesg: err})
    }
});

//@routes Post api/posts
//@desc Create a post 

router.post('/', async (req, res) => {
    console.log(req.body);
    const newPost = new Posts(req.body);

    try {
        const post = await newPost.save();
        if(!post) throw Error('Something went wrong with the post')
        res.status(200).json(post);
    } catch {
        res.status(400).json({msg: error})
    }
});

//@routes Delete api/posts/:id
//@desc Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.findByIdAndDelete(req.params.id);
        if(!post) throw Error('No post found!');
        res.status(200).json({success: true})
    }catch(err) {
        res.status(400).json({msg: error})
    }
});

//@routes Update api/posts/:id
//@desc Update a post
router.patch('/:id', async (req, res) => {
    try {
        const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
        if(!post) throw Error('Something went wrong while updating the post');
        res.status(200).json({success: true});
    }catch(err) {
        res.status(400).json({msg:err});
    }
});


module.exports = router; 