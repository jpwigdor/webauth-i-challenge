const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.find()
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we ran into an error retrieving the users" });
    });
});

module.exports = router;
