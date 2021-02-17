const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {  
  app.post(
    "/api/account",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signUp
  );

  app.post("/api/session", controller.signIn);
};
