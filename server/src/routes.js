const AuthenticationControllers = require("./controllers/AuthenticationControllers");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");
const SongControllers = require("./controllers/SongControllers");

module.exports = app => {
  //Register end points
  app.post("/register", AuthenticationControllerPolicy.register, AuthenticationControllers.register);

  app.post("/login", AuthenticationControllers.login);

  app.post("/users", AuthenticationControllers.users);

  app.get("/songs", SongControllers.index);

  app.post("/songs", SongControllers.post);

  app.get("/songs/:songId", SongControllers.show);

  app.put("/songs/:songId", SongControllers.put);
};
