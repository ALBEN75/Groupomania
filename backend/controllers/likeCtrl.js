const db = require('../models/index');
const Like = db.like;

exports.like = (req, res) => {
    Like.create({
        PostId: req.params.id,
        UserId: req.body.UserId
    })
    .then( ()=>{res.send(" Like enregistré ! ")})
    
    .catch(error => {res.status(400).send(error.message)}); 
};

exports.dislike = (req, res) => {
    console.log(req.body)
    Like.destroy({where:{
        PostId: req.params.id,
        UserId: req.params.UserId
    }})
    .then( ()=>{res.send(" Like annulé ! ")})
    
    .catch(error => {res.status(400).send(error.message)}); 
};