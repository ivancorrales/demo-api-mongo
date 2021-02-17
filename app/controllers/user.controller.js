const db = require("../models");
const User = db.user;

exports.showProfile = (req, res) => {
  User.findOne({
    _id: req.userId
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.status(200).send({
      fullName: user.fullName,
      username: user.username,
    });
  })
};
