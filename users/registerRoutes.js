const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);
const bcrypt = require("bcryptjs");

const Register = require("./users-model.js");

router.post("/", (req, res) => {
  let user = req.body;
  // check for username and password

  // console.log(user);

  const hash = bcrypt.hashSync(user.password, 10); // 2^10 rounds
  // password -> hash it -> hash = 1 round -> hash it -> hash = 2 rounds
  // has the password
  user.password = hash;

  Register.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
