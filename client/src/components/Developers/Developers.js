import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SideBar from "../SideBar/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import { create } from "../../helpers/ajax";
import Select from "@material-ui/core/Select";
import { read } from "../../helpers/ajax";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Grid from "@material-ui/core/Grid";
import AddArtist from "./AddArtist/AddArtist";
import AddAlbum from "./AddAlbum/AddAlbum";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    marginLeft: "2rem",
    width: "95%",
  },
  button: {
    marginTop: "1rem",
  },
}));

export default function Developers() {
  const classes = useStyles();
  const [openArtist, setOpenArtist] = useState(false);
  const [openAlbums, setOpenAlbums] = useState(false);
  const [artistsData, setArtistsData] = useState(null);
  const [albumsData, setAlbumsData] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const {
    register: addArtist,
    errors: errors2,
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onBlur",
  });
  const {
    register: addAlbum,
    errors: albumError,
    handleSubmit: SubmitAlbum,
  } = useForm({
    mode: "onBlur",
  });
  const onAddSong = (data) => {
    create("/api/v1/songs/addsong", data).catch((err) => {
      console.error(err);
    });
  };

  const handleClickOpenArtists = () => {
    setOpenArtist(true);
  };

  const handleClickOpenAlbums = () => {
    setOpenAlbums(true);
  };

  const handleClose = () => {
    setOpenArtist(false);
    setOpenAlbums(false);
  };

  const onAddArtist = (data) => {
    create("/api/v1/artists", data)
      .then((result) => {
        setOpenArtist(false);
      })
      .then((res) => {
        read("/api/v1/artists/all").then((res) => {
          setArtistsData(res);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onAddAlbum = (data) => {
    create("/api/v1/albums/addalbum", data)
      .then((result) => {
        setOpenAlbums(false);
      })
      .then((res) => {
        read("/api/v1/albums/all").then((res) => {
          setAlbumsData(res);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    read("/api/v1/albums/all")
      .then((res) => {
        setAlbumsData(res);
      })
      .catch((err) => {
        console.error(err);
      });
    read("/api/v1/artists/all")
      .then((res) => {
        setArtistsData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="main">
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="formWrapper">
          <form
            className={classes.root}
            onSubmit={handleSubmit(onAddSong)}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="Song Name"
              error={errors.title ? true : false}
              type="text"
              label="Song Name"
              name="title"
              inputRef={register({ required: true })}
            />
            <TextField
              id="youtube_link"
              error={errors.youtube_link ? true : false}
              type="text"
              label="Youtube Link"
              name="youtubeLink"
              inputRef={register({ required: true })}
            />
            <TextField
              id="lyrics"
              error={errors.lyrics ? true : false}
              type="text"
              label="Lyrics"
              fullWidth
              name="lyrics"
              inputRef={register({ required: true })}
            />
            <TextField
              id="createdAt"
              type="date"
              label="Created At"
              name="createdAt"
              variant="filled"
              inputRef={register({ required: true })}
              error={errors.created_at ? true : false}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Grid container>
              {artistsData && (
                <Grid item>
                  <InputLabel htmlFor="selectArtist">Artist</InputLabel>
                  <Select
                    native
                    id="selectArtist"
                    name="artistId"
                    placeholder="Artist"
                    inputRef={register({ required: true })}
                  >
                    <option aria-label="None"></option>
                    {artistsData.map((artist, index) => {
                      return (
                        <option key={index} value={artist.id}>
                          {artist.name}
                        </option>
                      );
                    })}
                  </Select>
                </Grid>
              )}
              <Grid item>
                <IconButton onClick={handleClickOpenArtists}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container>
              {albumsData && (
                <Grid item>
                  <InputLabel htmlFor="selectAlbums">Album</InputLabel>
                  <Select
                    native
                    id="selectAlbums"
                    name="albumId"
                    placeholder="Albums"
                    inputRef={register({ required: true })}
                  >
                    <option aria-label="None"></option>
                    {albumsData.map((album, index) => {
                      return (
                        <option key={index} value={album.id}>
                          {album.name}
                        </option>
                      );
                    })}
                  </Select>
                </Grid>
              )}
              <Grid item>
                <IconButton onClick={handleClickOpenAlbums}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
          {openArtist && (
            <AddArtist
              openArtist={openArtist}
              handleSubmit2={handleSubmit2}
              onAddArtist={onAddArtist}
              artistsData={artistsData}
              addArtist={addArtist}
              handleClose={handleClose}
            />
          )}

          {openAlbums && (
            <AddAlbum
              openAlbums={openAlbums}
              handleClose={handleClose}
              SubmitAlbum={SubmitAlbum}
              onAddAlbum={onAddAlbum}
              addAlbum={addAlbum}
              artistsData={artistsData}
            />
          )}
        </div>
      </div>
    </>
  );
}
