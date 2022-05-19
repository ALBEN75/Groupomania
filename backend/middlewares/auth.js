const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const id = decodedToken.id;
    
    
    if (req.body.id && req.body.id !== id) {
      throw 'User ID invalide !';
    } else {
      next(); 
    }
  } catch {
    res.status(403).json({ error: new Error ('Utilisateur non authorisée !') });// On génére une erreur 401 car la requête néccessite une authenfication valide. 
  }
};