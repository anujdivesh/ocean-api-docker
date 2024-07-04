module.exports = (sequelize, Sequelize) => {
    const log = sequelize.define("log", {
      task_class:{
        type: Sequelize.STRING
      },
      task_class_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      details: {
        type: Sequelize.STRING
      }
    });
  
    return log;
  };
  