const db = require('../models/index');
const User = db.user;
const Post = db.post;
const Comment = db.comment;
const fs = require('fs');

exports.createComment = (req, res) => {
    //console.log('create');
    Comment.create({
        contentComment: req.body.contentComment,
        fileComment: req.body.fileComment,
        UserId: req.body.UserId,
        PostId: req.body.PostId
    })
    .then(comment =>{
        res.status(200).send({
            message : "Commentaire enregistré avec succés"
        })
    })
    .catch(error => {res.status(400).send(error.message)}); 
};

exports.deleteComment = (req, res) => {
    Comment.findOne({ where:{ id: req.params.id } })
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