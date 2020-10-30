const express = require("express");
const usersRouter = express.Router();
const { registerValidation, loginValidation } = require("./validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

usersRouter.post("/validation", async (req, res, next) => {
  console.log(req.body);
  try {
    const validation = loginValidation(req.body);
    if (validation.error) {
      return res.status(400).send(validation.error.details[0].message);
    }
    const count = await User.count({
      where: {
        email: req.body.email,
      },
    });
    if (count === 0) {
      res.status(400).send({message : "email not exists"});
    }
    const result = await User.findOne({
      attributes: ["id", "name", "email", "user_password"],
      where: {
        email: req.body.email,
      },
      raw: true,
      nest: true,
    });
    console.log(result);
    const validPass = await bcrypt.compare(
      req.body.password,
      result.user_password
    );
    if (!validPass) {
      return res.status(400).send({message : "invalidPassword"});
    } else {
      const token = jwt.sign({ id: result.id, name: result.name }, process.env.TOKEN_SECRET);
      console.log(token);
      res.cookie('token', token)
      res.cookie('name', result.name)
      res.cookie('id', result.id)
      res.header('Authorization', token).json({message: "success"});
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const validation = registerValidation(req.body);
    if (validation.error) {
      return res.status(400).send(validation.error.details[0].message);
    }
    const count = await User.count({
      where: {
        email: req.body.email,
      },
    });
    if (count !== 0) {
      return res.status(400).send("email already exists");
    }
    //hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const register = await User.create({
      name: req.body.name,
      email: req.body.email,
      birth_date: req.body.birthDate,
      user_password: hashedPassword,
    });
    console.log(register);
    res.status(201).send({message: "success"});
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = usersRouter;