const Promise = require("bluebird");

module.exports = sequelize => {
  const Bookmarks = sequelize.define("Bookmarks", {});

  Bookmarks.associate = function(models) {
    Bookmarks.belongsTo(models.User);
    Bookmarks.belongsTo(models.Song);
  };
  return Bookmarks;
};
