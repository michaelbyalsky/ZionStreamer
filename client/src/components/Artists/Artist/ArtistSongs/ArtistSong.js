import React, { useEffect, useState } from "react";
import SideBar from "../../../SideBar/SideBar";
import { read } from "../../../../helpers/ajax";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import SongsList from "../../../Albums/AlbumSong/SongsList/SongsList";
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 1000,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "70%",
  },
  img: {
    margin: "auto",
    display: "block",
    width: "auto",
    height: "250px",
  },
}));

export default function ArtistSongs({ match }) {
  const [artistData, SetArtistData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbum = () => {
    read(`/api/v1/artists/${match.params.id}`)
      .then((res) => {
        SetArtistData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="main">
        <SideBar />
        {artistData && (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={4} xs={3}>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={artistData.artistImg}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {artistData.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {artistData.artistName}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {artistData.Songs.length} songs
                      </Typography>
                    </Grid>
                    <Grid item>
                    <Link to={`/songs/${artistData.Songs[0].id}?Artist=${artistData.Songs[0].artistId}`}>
                      <Button variant="body2" style={{ cursor: "pointer" }}>
                        Play
                      </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <div className={classes.paper}>
              {artistData.Songs.map((song, index) => {
                return <SongsList type="Artist" index={index} song={song} />;
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
