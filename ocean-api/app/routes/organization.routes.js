
const { authJwt } = require("../middleware");
const controller = require("../controllers/organization.controller");
module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  const organization = require("../controllers/organization.controller.js");

  var router = require("express").Router();

  // Retrieve all Tutorials
  router.get("/", organization.findAll);

  app.use('/v1/api/organizations', router);


  app.post(
    "/v1/api/organization/add",
    controller.findOrCreate
  );
  app.get(
    "/v1/api/organization/:id",
    controller.findOne
  );
  app.put(
    "/v1/api/organization/:id",
    controller.update
  );
  app.delete(
    "/v1/api/organization/:id",
    controller.destroy
  );
};