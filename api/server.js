const express = require("express");
const helmet = require("helmet");
const server = express();

//routes
const userRoutes = require("../users/userRoutes.js");
const registerRoutes = require("../users/registerRoutes.js");
const loginRoutes = require("../users/loginRoutes.js");

server.use(helmet());
server.use(express.json());

server.use("/api/users", userRoutes);
server.use("/api/register", registerRoutes);
server.use("/api/login", loginRoutes);

// Checking Route
server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;
