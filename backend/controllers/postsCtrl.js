const db = require('../models/index');
const User = db.user;
const Post = db.post;
const Comment = db.comment;
const Like = db.like;

exports.createPost = (req, res) => {
    console.log('create');
    console.log(req.body);
    let fileName = "";
    if (req.file) {
        fileName= `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    Post.create({
        content: req.body.content,
        file: fileName,
        UserId: req.body.UserId,
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
        include:[ User, 
            {model: Comment, include: User},
            {model: Like, include: User}
        ],
        order: [
            ["updatedAt", "DESC"]
        ]
    
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => {res.status(400).send(error.message)});
};

exports.modifyPost = (req, res) => {
    let data ;
    if (req.file) {
        data = { 
            content: req.body.content,
            file: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }
    } else {
        data = {
            content: req.body.content
        }
    }
    Post.update({...data}, {where: {id:req.params.id}})
    .then(()=> {res.send("Modification enregistrée avec succée !")})
    .catch(error => {res.status(400).send(error.message)});
};

exports.deletePost = (req, res) => {
    Post.findOne({ where:{ id: req.params.id } })
    .then(post => {
            Post.destroy({ where:{ id: req.params.id } })
            .then(() =>
                res.send({
                    message: "Supression effectuée avec succés !"
                }))
            .catch(error => {res.status(400).send(error.message)});
    })
};
