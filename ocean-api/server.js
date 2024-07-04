var compression = require('compression');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var http = require('http');
var https = require('https');

const bcrypt = require("bcryptjs");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;
const app = express();
app.use(compression());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(express.static(__dirname + '/public', { maxAge: 31557600 }));

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");


// db.sequelize.sync();
// force: true will drop the table if it already exists
//db.sequelize.sync({force:true}).then(() => {
//  console.log('Drop and Resync Database with { force: true }');
//  initial();
//});

//prod
db.sequelize.sync();

// simple route
app.get("/v1", (req, res) => {
  res.json({ message: "Pacific Ocean Portal secured with JWT, OpenAPI 1.0 " });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/country.routes')(app);
require('./app/routes/organization.routes')(app);
require('./app/routes/dataset.routes')(app);
require('./app/routes/task.routes')(app);
require('./app/routes/log.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//FOR TESTING PURPOSES
const Country = db.country;
const Role = db.role;
const Organization = db.organization;
const User = db.user;
const Dataset = db.dataset;
const Task = db.task;
const Log = db.log;

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admineyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6Im"
  });
 
  Role.create({
    id: 3,
    name: "registered"
  });
  Country.create({
    short_name:"FJ",
    long_name: "Fiji Islands",
    west_bound_longitude:"179.19377210107413",
    east_bound_longitude:"179.1978081648181",
    south_bound_latitude:"-8.522978429308308",
    north_bound_latitude:"-8.51696092405461",
    crs:"EPSG:4326"
  });
  Organization.create({
    short_name:"SPC",
    long_name: "Pacific Community",
    website:"https://www.spc.int/"
  });
  Dataset.create({
    short_name: "WaveWatch3",
    long_name:"AUSWAVE Global Ocean Waves Forecast",
    type:"outlook",
    data_provider:"Australian Bureau of Meteorology",
    data_source_url:"http://opendap.bom.gov.au:8080/thredds/catalog/nmoc/ww3_global_fc/catalog.html",
    data_download_url:"http://opendap.bom.gov.au:8080/thredds/fileServer/nmoc/ww3_global_fc/{download_file_name}",
    login_credentials_required: false,
    username:"",
    password:"",
    API_key:"",
    download_method:"opendap",
    download_file_prefix:"ww3_",
    download_file_infix:"%Y%m%d_%H",
    download_file_suffix:".R.nc",
    download_file_type:"netCDF",
    download_directory:"/home/pop/ocean_portal/datasets/model/regional/ww3forecast/forecast",
    download_frequency:"daily",
    subset:true,
    subset_region:"PAC"
  });
  
  Task.create({
    task_name:"Download WW3 Datasets",
    task_class:"data_download",
    task_class_id:1,
    status:"Ready",
    priority:"Medium",
    frequency:"Daily",
    occurance_days:"1",
    occurance_hours:"1",
    duration:"Indefinitely",
    task_start_time:"2024-06-05 00:00:00",
    next_run_time:"2024-06-02T00:00:00.000Z",
    last_run_time:"2024-06-02T00:00:00.000Z",
    enabled:true,
    health:'Excellent',
    fail_count:0,
    success_count:0,
    reset_count: 0,
    created_by:'root',
    launched_by:'root',
    retain: false,
  });
  
  Log.create({
    task_class:"data_download",
    task_class_id:1,
    status:"success",
    details:"success"
  })
}

