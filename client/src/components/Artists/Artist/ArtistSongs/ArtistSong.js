import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "../../../NavBar/NavBar";
import SideBar from "../../../SideBar/SideBar";
import { read } from "../../../../helpers/ajax";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import SongsList from "../../../Albums/AlbumSong/SongsList/SongsList";
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "70%",
    height: "45%"
  },
  img: {
    margin: "auto",
    display: "block",
    width: "300px",
    height: "200px",
  },
}));

export default function ArtistSongs({ match }) {
  const [searchText, setSearchText] = useState(""); // search input text
  const [artistData, SetArtistData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbum = () => {
    read(`/artists/artist/${match.params.id}`).then((res) => {
      console.log(res);
      SetArtistData(res);
    });
  };

  console.log(match.params.id);

  return (
    <>
      <NavBar />
      <div className="main">
        <SideBar />
        {artistData && (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={artistData[0].cover_img}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs con ntainer direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {artistData[0].album_name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {artistData[0].artist_name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {artistData.length} songs
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="body2" style={{ cursor: "pointer" }}>
                        Play
                      </Button>
                      <Button variant="body2" style={{ cursor: "pointer" }}>
                        Add to library
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            
            </Paper>
            <div className={classes.paper}>
              {artistData.map((song, index) => {
               return <SongsList index={index} song={song} />;
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
