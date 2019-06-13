// Imports
const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const SessionStore = require("connect-session-knex")(session);

// Routes
const userRoutes = require("../users/userRoutes.js");
const registerRoutes = require("../users/registerRoutes.js");
const loginRoutes = require("../users/loginRoutes.js");

const server = express();
const sessionConfig = {
  name: "monkey",
  secret: "super secret string",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour. 60sec + 60 min + 1000 miliseconds
    secure: false,
    httpOnly: true
  },
  store: new SessionStore({
    knex: require("../data/dbConfig.js"),
    tablename: "sessions",
    sidfieldname: "sid", // which column to store the session ID, SID.
    createtable: true, // creates table if it doesn't exist through our migrations.
    clearInterval: 60 * 60 * 1000 // time in session before it expires. // 60 minutes, 60 seconds, 1000 miliseconds
  })
};

server.use(session(sessionConfig));
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
