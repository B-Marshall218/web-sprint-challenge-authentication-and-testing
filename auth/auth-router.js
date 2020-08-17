const router = require('express').Router();
const bcryptjs = require("bcryptjs")


const jwt = require("jsonwebtoken");

const Users = require("../users/user-model");

const { isValid } = require("../users/user-service");


router.post('/register', (req, res) => {
  // implement registration

  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashsync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then(user => {
        const token = makeJwt(user)
        res.status(201).json({ data: user, token })
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  } else {
    res.status(400).json({ message: "please provide a username and password" })
  }
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        console.log("user", user)
        if (user && bcryptjs.compreSynch(password, user.password)) {
          const token = makeJwt(user)
          res.status(200).json({ message: "Welcome Chosen One", token })
        } else {
          res.status(401).json({ message: "Invalid. You Shall Not Pass" })
        }
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  } else {
    res.status(400).json({ messaage: "please provide username and password" })
  }

});

function makeJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = proccess.env.JWT_SECRET || "Your secret is safe with me";

  const options = {
    expiresIn: "1h",
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
