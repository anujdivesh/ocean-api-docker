
const { authJwt } = require("../middleware/index.js");
const controller = require("../controllers/log.controller.js");
module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  const log = require("../controllers/log.controller.js");

  var router = require("express").Router();

  // Retrieve all Tutorials
  router.get("/", log.findAll);

  app.use('/v1/api/logs', router);


  app.post(
    "/v1/api/log/add",
    controller.findOrCreate
  );
  app.get(
    "/v1/api/log/:id",
    controller.findOne
  );
  app.put(
    "/v1/api/log/:id",
    controller.update
  );
  app.delete(
    "/v1/api/log/:id",
    controller.destroy
  );
};