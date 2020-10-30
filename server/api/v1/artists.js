const express = require("express");
const Sequelize = require("sequelize");
const artistsRouter = express.Router();
const { Artist, Album, Song, InteractionsArtists } = require("../../models");
const { Op } = require("sequelize");

artistsRouter.get("/all", async (req, res, next) => {
  try {
    if (req.query.searchText) {
      const result = await Artist.findAll({
        attributes: ["id", "name", "artist_img", "createdAt", "updatedAt"],
        where: {
          name: {
            [Op.like]: `%${req.query.searchText}%`,
          },
        },
        include: {
          model: Album,
          attributes: [
            "id",
            "artist_id",
            "name",
            "cover_img",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      res.json(result);
    } else {
      const result = await Artist.findAll({
        attributes: ["id", "name", "artist_img", "createdAt", "updatedAt"],
        include: {
          model: Album,
          attributes: [
            "id",
            "artist_id",
            "name",
            "cover_img",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      res.json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({message: "not found"});
  }
});

artistsRouter.get(`/top/:id`, async (req, res, next) => {
  const result = await Artist.findAll({
    limit: 20,
    include: {
      model: Song,
      attributes: [
        "id",
        "title",
        "artist_id",
        "youtube_link",
        "album_id",
        "length",
        "track_number",
        "lyrics",
        "createdAt",
        "updatedAt",
      ],
    },
    include: {
      model: InteractionsArtists,
      where: {
        user_id: req.params.id,
      },
    }
  });
  res.send(result);
});

artistsRouter.get(`/:id`, async (req, res, next) => {
  const result = await Artist.findOne({
    attributes: ["id", "name", "artist_img", "createdAt", "updatedAt"],
    include: {
      model: Song,
      attributes: [
        "id",
        "title",
        "artist_id",
        "youtube_link",
        "album_id",
        "length",
        "track_number",
        "lyrics",
        "createdAt",
        "updatedAt",
      ],
    },
  });
  res.send(result);
});

artistsRouter
.post('/interaction', async (req, res) => {
  try {
    const count = await InteractionsArtists.count({
      where: {
        user_id: req.body.user_id,
        album_id: req.body.song_id,
      },
    });
    if (count !== 0) {
      const result = await InteractionsArtists.findOne({
        where: {
          user_id: req.body.user_id,
          album_id: req.body.song_id,
        },
        raw: true
      });
      const updatedInteraction = await InteractionsArtists.update(
        {play_count: result.play_count + 1},
          {where: {
            user_id: req.body.user_id,
            album_id: req.body.song_id
          }},
      );
      res.send(updatedInteraction);
    } else {
      const newInteraction = await InteractionsArtists.create(req.body);
      res.send(newInteraction);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("bad");
  }
})

artistsRouter.post("/", async (req, res, next) => {
  try {
    const result = await Artist.create(req.body);
    res.send(result);
  } catch (err) {
    res.status(400).send("bad body");
  }
});

artistsRouter.put("/artist", async (req, res, next) => {});

artistsRouter.delete("/artist/:id", async (req, res) => {});

module.exports = artistsRouter;