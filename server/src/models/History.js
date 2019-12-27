const Promise = require("bluebird");

module.exports = sequelize => {
  const History = sequelize.define("History", {});

  History.associate = function(models) {
    History.belongsTo(models.User);
    History.belongsTo(models.Song);
  };
  return History;
};
