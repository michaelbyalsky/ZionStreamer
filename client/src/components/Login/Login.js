import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { create } from "../../helpers/ajax";
import { useHistory, Link } from "react-router-dom";
import AuthApi from "../../helpers/context";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
}));

function Login() {
  const { loggedInValue } = React.useContext(AuthApi);
  const [loggedIn, setLoggedIn] = loggedInValue;
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let rememberMeValue = Cookies.get("rememberMe");
    let token = Cookies.get("token");
    if (rememberMeValue && token) {
      setLoggedIn(true);
      history.push("/");
    }
  }, []);

  const login = (e) => {
    let body = {
      email: user,
      password: password,
    };
    create(`/users/validation`, body)
      .then(async (res) => {
        if (rememberMe) {
          Cookies.set("rememberMe", true);
        } else {
          setLoggedIn(true);
        }
        history.push("/");
      })
      .catch((err) => {
        if (typeof err === "string") {
          setError(err);
        }
        setTimeout(() => {
          setError(null);
        }, 3000);
        setLoggedIn(false);
      });
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => e.preventDefault() && false}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="User">User</InputLabel>
            <Input
              id="user"
              name="user"
              autoComplete="off"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <label>
            <input
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(() => !rememberMe)}
              type="checkbox"
            />
            Remember me
          </label>
          {error && (
            <div>
              <label style={{ color: "red" }}>{error}</label>
            </div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={login}
            className={classes.submit}
          >
            Sign in
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </Paper>
    </main>
  );

  // async function login() {
  // 	try {
  // 		await firebase.login(email, password)
  // 		props.history.replace('/dashboard')
  // 	} catch(error) {
  // 		alert(error.message)
  // 	}
  // }
}

export default Login;
