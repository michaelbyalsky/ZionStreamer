import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  TextField,
  List,
  Drawer,
  ListItem,
  IconButton,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import ComputerIcon from "@material-ui/icons/Computer";
import AlbumIcon from "@material-ui/icons/Album";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import "./SideBar.css";
import HomeIcon from '@material-ui/icons/Home';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginLeft: 0,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    height: "100%",
    width: "80%",
    position: "relative"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function SideBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      {open && (
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      )}
      <List>
        {!open && (
          <ListItem>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          </ListItem>
        )}
        <NavLink to={`/Home`} activeStyle={{backgroundColor: 'grey'}} >
          <ListItem>
            <IconButton aria-label="Home">
              <HomeIcon />
            </IconButton>
          </ListItem>
        </NavLink>
        <Link to={`/Songs`}>
          <ListItem>
            <IconButton aria-label="Songs">
              <MusicNoteIcon />
            </IconButton>
          </ListItem>
        </Link>
        <Link to={`/Albums`}>
          <ListItem>
            <IconButton aria-label="Albums">
              <AlbumIcon />
            </IconButton>
          </ListItem>
        </Link>
        <Link to={`/Artists`}>
          <ListItem>
            <IconButton aria-label="Artists">
              <PeopleAltIcon />
            </IconButton>
          </ListItem>
        </Link>
        <Link to={`/Playlists`}>
          <ListItem>
            <IconButton aria-label="Playlists">
              <QueueMusicIcon />
            </IconButton>
          </ListItem>
        </Link>
        <Link to={`/Developers`}>
          <ListItem>
            <IconButton aria-label="Developers">
              <ComputerIcon />
            </IconButton>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}