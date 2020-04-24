const bcrypt = require('bcryptjs');
//const Users = require('../users/users-model.js');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
  
  try {
    const token = req.headers.authorization.split('')[1];
    console.log(token);

    if (token) {
      jwt.verify(token, secrets.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          throw new Error(err)
          //res.status(401).json({message: 'bad auth' })    
        }
        else {
          req.decodedToken = decodedToken;
          next();
        }
      })
    }  
    else {
      throw new Error('Bad authentication')
    }
  }
  catch (error) {
    res.status(401).json(err.message);
  }

  /* // we removed all this code
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Ran into an unexpected error' });
      });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
*/

};
