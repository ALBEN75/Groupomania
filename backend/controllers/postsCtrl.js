const db = require('../models/index');
const User = db.user;
const Post = db.post;
const Comment = db.comment;
const fs = require('fs');
const { comment } = require('../models/index');

exports.createPost = (req, res) => {
    console.log('create');
    Post.create({
        content: req.body.content,
        file: req.body.file
    })
    .then(post =>{
        res.status(200).send({
            message : "Publication enregistré avec succés"
        })
    })
    .catch(error => {res.status(400).send(error.message)}); 
};

exports.getOnePost = (req, res) => {
    Post.findOne({ where:{ id: req.params.id } })
    .then(post => res.status(200).json(post))
    .catch(error => {res.status(400).send(error.message)}); 
};

exports.getAllPosts = (req, res) => {
    Post.findAll({ 
        include:[ User, { 
            model: Comment, include: User
        }]
    })
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
    Post.findOne({ where:{ id: req.params.id } })
    .then(post => {
        /*const filename = post.file.split('/images/')[1];*/
        //fs.unlink(`images/${filename}`, () => {
            Post.destroy({ where:{ id: req.params.id } })
            .then(() =>
                res.send({
                    message: "Supression effectuée avec succés !"
                }))
            .catch(error => {res.status(400).send(error.message)});
        //});
    })
};
