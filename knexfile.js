module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/dev.sqlite3" // the folder will be created when we run the migrations
    },
    seeds: {
      directory: "./data/seeds"
    },
    migrations: {
      directory: "./data/migrations"
    },
    pool: {
      // Make SQLite3 respect foreign keys
      afterCreate: (connection, done) => {
        connection.run("PRAGMA foreign_keys = ON", done);
      }
    },
    useNullAsDefault: true
  },

  staging: {},

  production: {}
};
