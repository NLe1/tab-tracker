const { Song } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      let songs = null;
      if (req.query.search) {
        const search = req.query.search;
        songs = await Song.findAll({
          where: {
            [Op.or]: ["title", "artist", "genre", "album"].map(key => ({
              [key]: {
                [Op.like]: `%${search}`,
                [Op.like]: `${search}%`
              }
            }))
          }
        });
      } else {
        songs = await Song.findAll({ limit: 10 });
      }
      res.send(songs);
    } catch (error) {
      res.status(500).send({
        error: "An error has occured trying to fetch songs"
      });
    }
  },
  async show(req, res) {
    try {
      const song = await Song.findByPk(req.params.songId);
      res.send(song);
    } catch (error) {
      res.status(500).send({
        error: "An error has occured trying to fetch songs"
      });
    }
  },
  async put(req, res) {
    try {
      const song = await Song.update(req.body, { where: { id: req.params.songId } });
      res.send(req.body);
    } catch (error) {
      res.status(500).send({
        error: "An error has occured trying to update the song"
      });
    }
  },
  async post(req, res) {
    try {
      const song = await Song.create(req.body);
      res.send(song);
    } catch (error) {
      res.status(500).send({
        error: "An error has occured trying to create a new song"
      });
    }
  }
};
