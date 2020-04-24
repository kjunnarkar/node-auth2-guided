const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets')

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved); // pass the created user into the generateToken method
      res.status(201).json({ created_user: saved, token: token }); //return user object and token
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // pass the found user into generateToken method and get token
        // return the found user's username and the token
        res.status(200).json({ username: `Welcome ${user.username}!`, token: token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {

  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['STUDENT']
    // can do this instead: isSTUDENT: true
  };

  //const secret = process.env.JWT_SECRET || 'mysecret';

  const options = {
    expiresIn: '30 min'
  }
  
  const token = jwt.sign(payload, secrets.JWT_SECRET, options);
  //console.log(token);
  return token;

}

module.exports = router;
