const db = require('../models/index');
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.create({
        username: req.body.username,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        job: req.body.job,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        res.send({
            message: "Utilisateur enregistré avec succés"
        })
    })
    .catch(error => {res.status(500).send(error.message)}); 
};

exports.login = (req, res) => {
    User.findOne({ where:{email: req.body.email} })
    .then(user => {
        bcrypt.compare(req.body.password, user.password)
        .then(verifiedPassword =>{
            if(!verifiedPassword) {
                 res.status(400).json({message: "Utilisateur non trouvé!"});
            } else {
                res.status(200).json({
                    user,
                    token: jwt.sign(
                        {userId: user.id},
                        `{process.env.TOKEN}`,
                        {expiresIn: "24h"}
                    )
                })
            }
        })
        .catch(error => {res.status(500).send(error.message)}); 
    })
    .catch(error => {res.status(500).send(error.message)});
};
exports.modifyUser = (req,res) => {
    
};