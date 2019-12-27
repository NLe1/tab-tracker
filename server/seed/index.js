const { sequelize, Song, User, Bookmarks, History } = require("../src/models");

const songs = require("./songs.json");
const users = require("./users.json");
const bookmarks = require("./bookmarks.json");
const historys = require("./history.json");
const Promise = require("bluebird");

sequelize.sync({ force: true }).then(async function() {
  await Promise.all(
    users.map(user => {
      User.create(user);
    })
  );
  await Promise.all(
    songs.map(song => {
      Song.create(song);
    })
  );
  await Promise.all(
    bookmarks.map(bookmark => {
      Bookmarks.create(bookmark);
    })
  );

  await Promise.all(
    historys.map(history => {
      History.create(history);
    })
  );
});
