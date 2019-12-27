const { Bookmarks, Song } = require("../models");
const _ = require("lodash");

module.exports = {
  async index(req, res) {
    try {
      const UserId = req.user.id;
      const { SongId } = req.query;
      const where = {
        UserId
      };
      if (SongId !== undefined) {
        where.SongId = SongId;
      }
      console.log(where);
      const bookmarks = await Bookmarks.findAll({
        where,
        include: [
          {
            model: Song
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend({}, bookmark.Song, bookmark));
      res.send(_.uniqBy(bookmarks, bookmark => bookmark.SongId));
    } catch (err) {
      res.status(500).send({
        error: "an error has occured trying to fetch the bookmark"
      });
    }
  },

  async post(req, res) {
    try {
      const UserId = req.user.id;
      const { SongId } = req.body;
      const bookmarkFindOne = await Bookmarks.findOne({
        where: {
          SongId,
          UserId
        }
      });
      if (bookmarkFindOne) {
        return res.status(400).send({
          error: "You already have this set as a bookmark"
        });
      }
      const bookmark = await Bookmarks.create({ SongId, UserId });
      res.send(bookmark);
    } catch (error) {
      res.status(500).send({
        error: "An error has occured trying to create a bookmark"
      });
    }
  },
  async delete(req, res) {
    try {
      const UserId = req.user.id;
      const { bookmarkId } = req.params;
      const bookmark = await Bookmarks.findOne({
        where: {
          id: bookmarkId,
          UserId
        }
      });
      if (!bookmark) {
        return res.status(403).send({
          error: "You do not have access to this resources"
        });
      }
      await bookmark.destroy();
      res.send(bookmark);
    } catch (error) {
      res.status(500).send({
        error: "An error has occured trying to delete bookmark"
      });
    }
  }
};
