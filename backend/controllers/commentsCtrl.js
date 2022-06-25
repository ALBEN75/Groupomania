const db = require('../models/index');
const Comment = db.comment;


exports.createComment = (req, res) => {
    //console.log('create');
    Comment.create({
        contentComment: req.body.contentComment,
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
            Comment.destroy({ where:{ id: req.params.id } })
            .then(() =>
                res.send({
                    message: "Supression effectuée avec succés !"
                }))
            .catch(error => {res.status(400).send(error.message)});
    })
};
