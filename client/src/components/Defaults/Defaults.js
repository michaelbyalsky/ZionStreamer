import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SideBar from "../SideBar/SideBar";
import { read } from "../../helpers/ajax";
import Cookies from "js-cookie";
import Artist from "../Artists/Artist/Artist";
import Song from "../Song/Song";
import Album from "../Albums/Album/Album";
import Playlist from "../Playlists/playlist";

const useStyles = makeStyles({
  main: {
    display: "grid",
    gridTemplateColumns: "5% 95%",
  },
  root: {
    flexGrow: 1,
  },
  content: {
    marginTop: "1rem",
  },
  card: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 250px)",
    gridAutoRows: "auto",
    gridGap: "1rem",
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [songsData, setSongsData] = useState(null);
  const [albumsData, setAlbumsData] = useState(null);
  const [artistsData, setArtistsData] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);
  const [userId, setUserId] = useState(Cookies.get("id"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getSongs();
  }, []);

  const getSongs = () => {
    setArtistsData(null);
    setAlbumsData(null);
    setPlaylistsData(null);
    read(`/api/v1/songs/top/${userId}`)
      .then((result) => {
        if (!Array.isArray(result)) {
          let temp = [];
          temp.push(result);
          setSongsData(temp);
        } else {
          setSongsData(result);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAlbums = () => {
    setArtistsData(null);
    setSongsData(null);
    setPlaylistsData(null);
    read(`/api/v1/albums/top/${userId}`)
      .then((result) => {
        if (!Array.isArray(result)) {
          let temp = [];
          temp.push(result);
          setAlbumsData(temp);
        } else {
          setAlbumsData(result);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getArtists = () => {
    setAlbumsData(null);
    setSongsData(null);
    setPlaylistsData(null);
    read(`/api/v1/artists/top/${userId}`)
      .then((result) => {
        if (!Array.isArray(result)) {
          let temp = [];
          temp.push(result);
          setArtistsData(temp);
        } else {
          setArtistsData(result);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getPlaylists = () => {
    setArtistsData(null);
    setSongsData(null);
    setAlbumsData(null);
    read(`/api/v1/playlists/top/${userId}`)
      .then((result) => {
        if (!Array.isArray(result)) {
          let temp = [];
          temp.push(result);
          setPlaylistsData(temp);
        } else {
          setPlaylistsData(result);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={classes.main}>
      <SideBar />
      <div>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Songs" onClick={getSongs} />
            <Tab label="Albums" onClick={getAlbums} />
            <Tab label="Artists" onClick={getArtists} />
            <Tab label="Playlists" onClick={getPlaylists} />
          </Tabs>
        </Paper>
        <div className={classes.content}>
          {songsData && (
            <div className={classes.card}>
              {songsData.map((songData, i) => {
                return (
                  <div key={i}>
                    <Song
                      songsData={songsData}
                      setSongsData={setSongsData}
                      songData={songData}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {albumsData && (
            <div className={classes.card}>
              {albumsData.map((albumData, i) => {
                return (
                  <div key={i}>
                    <Album
                      albumData={albumData}
                      albumsData={albumsData}
                      setAlbumsData={setAlbumsData}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {artistsData && (
            <div className={classes.card}>
              {artistsData.map((artistData, i) => {
                return (
                  <div key={i}>
                    <Artist
                      artistsData={artistsData}
                      setArtistsData={setArtistsData}
                      artistData={artistData}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {playlistsData && (
            <div className={classes.card}>
              {playlistsData.map((playlistData, i) => {
                return (
                  <div key={i}>
                    <Playlist
                      playlistsData={playlistsData}
                      setPlaylistsData={setPlaylistsData}
                      playlistData={playlistData}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
