const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/v1/api/auth/refreshtoken", controller.refreshToken);
  app.post("/v1/api/auth/forgotpassword", controller.forgotPassword);
  app.get("/v1/api/auth/resetPassword/:id/:token", controller.resetPassword);
  app.post("/v1/api/auth/resetPassword/:id/:token", controller.resetPasswordpost);
  app.post("/v1/api/auth/addRoleeyJhbGciOiJIUzI1NiIsInR5cC", controller.findOrCreateRole);
  app.get("/v1/api/auth/findeyJhbGciOiJIUzI1NiIsInR5cC", controller.findAllRole);
  app.post("/v1/api/auth/logout", controller.destroyRefresh);
};