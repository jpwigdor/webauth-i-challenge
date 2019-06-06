const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);
const bcrypt = require("bcryptjs");

const Login = require("./users-model.js");

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
        res.status(200).json({ message: `Welcome ${user.name}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// router.post("/", async (req, res) => {
//   const { name, password } = req.body;
//   console.log(req.body);
//   try {
//     if (name && password) {
//       const account = await db.findby(name);
//       if (account && bcrypt.compareSync(password, account.password)) {
//         req.session.user = account;
//         res.status(200).send(`Logged in as ${account.name}`);
//       } else {
//         res.status(400).json({ message: "You shall not pass!" });
//       }
//     } else {
//       res.status(400).json({ message: "Provide a name and password" });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "There was an error validating that account" });
//   }
// });

module.exports = router;
