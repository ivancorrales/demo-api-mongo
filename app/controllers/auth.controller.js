const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



exports.signUp = (req, res) => {

  if (!req.body.username){
      res.status(400).send({ message: 'missing required field username' });
      return;
  }
    if (!req.body.password){
        res.status(400).send({ message: 'missing required field password' });
        return;
    }
  const user = new User({
    fullName: req.body.fullName,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }    
    user.save(err => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "User was registered successfully!" });
    });
    
  });
};

exports.signIn = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        accessToken: token
      });
    });
};
