const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.get("/api/me", [authJwt.verifyToken], controller.showProfile);
};
