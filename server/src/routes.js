const AuthenticationControllers = require("./controllers/AuthenticationControllers");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");
const SongControllers = require("./controllers/SongControllers");
const BookmarksControllers = require("./controllers/BookmarksControllers");
const HistoryControllers = require("./controllers/HistoryControllers");
const isAuthenticated = require("./policies/isAuthenticated");

module.exports = app => {
  //Register end points
  app.post("/register", AuthenticationControllerPolicy.register, AuthenticationControllers.register);

  app.post("/login", AuthenticationControllers.login);

  app.post("/users", AuthenticationControllers.users);

  app.get("/songs", SongControllers.index);

  app.post("/songs", SongControllers.post);

  app.get("/songs/:songId", SongControllers.show);

  app.put("/songs/:songId", SongControllers.put);

  app.get("/bookmarks", isAuthenticated, BookmarksControllers.index);

  app.post("/bookmarks", isAuthenticated, BookmarksControllers.post);

  app.get("/history", isAuthenticated, HistoryControllers.index);

  app.post("/history", isAuthenticated, HistoryControllers.post);

  app.delete("/bookmarks/:bookmarkId", isAuthenticated, BookmarksControllers.delete);
};
