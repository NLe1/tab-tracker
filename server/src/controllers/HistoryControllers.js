const { History, Song } = require("../models");
const _ = require("lodash");
module.exports = {
  async index(req, res) {
    try {
      const UserId = req.user.id;
      const historys = await History.findAll({
        where: {
          UserId
        },
        include: [{ model: Song }]
      })
        .map(history => history.toJSON())
        .map(history => _.extend({}, history.Song, history));

      res.send(_.uniqBy(historys, history => history.SongId));
    } catch (error) {
      res.status(500).send({
        error: "An error has occured trying to fetch history"
      });
    }
  },

  async post(req, res) {
    try {
      const UserId = req.user.id;
      const { SongId } = req.body;
      const history = await History.create({ SongId, UserId });
      res.send(history);
    } catch (error) {
      res.status(500).send({
        error: "An error has occured trying to create a history object"
      });
    }
  }
};
