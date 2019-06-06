const express = require("express");
const helmet = require("helmet");
const server = express();

// //routes
// const projectRoutes = require("../routes/projectRoutes.js");
// const actionRoutes = require("../routes/actionRoutes.js");

server.use(helmet());
server.use(express.json());

// server.use("/projects", projectRoutes);
// server.use("/actions", actionRoutes);

// Checking Route
server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;
