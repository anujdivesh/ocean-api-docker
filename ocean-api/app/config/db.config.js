module.exports = {
  HOST: "postgres",
  USER: "postgres",
  PASSWORD: "Oceanportal2017*",
  DB: "ocean_api",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};