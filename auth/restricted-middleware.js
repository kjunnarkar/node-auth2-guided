//const bcrypt = require('bcryptjs'); // we don't need this for the new method for authentication
// the new method for verifying authentication uses JWT and secrets...
// in new method we don't need to look up user in DB so we don't need users model...
//const Users = require('../users/users-model.js');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

//***
// JSON Web Tokens (JWT) checks if authorization token is included as a header, and that
// the token is 1) valid and 2) not expired.
//***

module.exports = (req, res, next) => {
  
  try {
    const token = req.headers.authorization.split('')[1]; //strips off "bearer" type from token
    //console.log(token);

    if (token) {
      jwt.verify(token, secrets.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          //throw new Error(err)
          res.status(401).json({ message: 'not authorized' })    
        }
        else {
          req.decodedToken = decodedToken;
          next();
        }
      })
    }  
    else {
      throw new Error('invalid authorization')
    }
  }
  catch (error) {
    res.status(401).json({ error: error.message });
  }

  // we removed all this code...old method for checking authorization of user
  /*
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
