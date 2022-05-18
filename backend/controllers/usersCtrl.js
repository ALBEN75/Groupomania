const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)  
        .then(hash => {
            // Inscription du nouvel utilisateur
            const user = new User({
                email: req.body.email,
                password: hash// Mot de passe crypté (hash). 
            });
            user.save()// On utilise la méthode save pour enregistrer l'utilisateur dans la base de données. 
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
          
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id, 
              token: jwt.sign( 
                { userId: user._id },  
                process.env.TOKEN, 
                { expiresIn: '24h' } 
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };