
const { authJwt } = require("../middleware");
const controller = require("../controllers/dataset.controller");
module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  const dataset = require("../controllers/dataset.controller.js");

  var router = require("express").Router();

  // Retrieve all Tutorials
  router.get("/", dataset.findAll);

  app.use('/v1/api/datasets', router);


  app.post(
    "/v1/api/dataset/add",
    controller.findOrCreate
  );
  app.get(
    "/v1/api/dataset/:id",
    controller.findOne
  );
  app.put(
    "/v1/api/dataset/:id",
    controller.update
  );
  app.delete(
    "/v1/api/dataset/:id",
    controller.destroy
  );
};