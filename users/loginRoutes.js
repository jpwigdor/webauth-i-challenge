const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);
const bcrypt = require("bcryptjs");

const Login = require("./users-model.js");

// POST https://localhost:5000/api/login/
router.post("/", (req, res) => {
  let { name, password } = req.body;
  console.log(req.body);

  Login.findBy({ name })
    .first()
    .then(user => {
      //
      console.log("FindByName" + name);
      if (user && bcrypt.compareSync(password, user.password)) {
        // password=the entered password. // user.password = hash within the db.sss
        req.session.user = user;

        res.status(200).json({ message: `Welcome ${user.name}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
