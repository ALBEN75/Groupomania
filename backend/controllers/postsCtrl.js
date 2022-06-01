const db = require('../models/index');
const Post = db.post;
const fs = require('fs');

exports.createPost = (req, res) => {
    console.log('create');
    Post.create({
        content: req.body.content,
        file: req.body.file
    })
    .then(post =>{
        res.send({
            message : "Publication enregistré avec succés"
        })
    })
    .catch(error => {res.status(400).send(error.message)}); 
};

exports.getOnePost = (req, res) => {
    Post.findOne({ id: req.body.id })
    .then(post => {
        res.send({
            message: "Post récupérer avec succés !"
        })
    })
    .catch(error => {res.status(400).send(error.message)}); 
};

exports.getAllPosts = (req, res) => {
    Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => {res.status(400).send(error.message)});
};

exports.modifyPost = (req, res) => {
    Post.findOne({ PostId: req.body.PostId }, { UserId: req.body.UserId } )

    Post.update({ PostId: req.body.PostId })
    .then(posts => res.status(200).json(posts))
    .catch(error => {res.status(400).send(error.message)});
};

exports.deletePost = (req, res) => {
    Post.findOne({ PostId: req.body.PostId })
    .then(post => {
        const filename = post.file.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ PostId: req.body.PostId })
            res.send({
                message: "Supression effectuée avec succés !"
            })
            .catch(error => {res.status(400).send(error.message)});
        });
    })
};

exports.likeOrDislikePost = (req, res) => {

};