const db = require("../models");
const config = require("../config/auth.config");
const Task = db.task;
const Dataset = db.dataset;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    
  Task.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organizations."
      });
    });
};

exports.findOrCreate = (req, res) => {
  return Task.create({
      task_name: req.body.task_name,
      task_class:req.body.task_class,
      task_class_id: req.body.task_class_id,
      status: req.body.status,
      priority: req.body.priority,
      frequency: req.body.frequency,
      occurance_days: req.body.occurance_days,
      occurance_hours: req.body.occurance_hours,
      duration: req.body.duration,
      task_start_time: req.body.task_start_time,
      next_run_time: req.body.next_run_time,
      last_run_time: req.body.last_run_time,
      enabled: req.body.enabled,
      health:req.body.health,
      fail_count:req.body.fail_count,
      success_count:req.body.success_count,
      reset_count: req.body.reset_count,
      predecessor_class:req.body.predecessor_class,
      predecessor_class_id:req.body.predecessor_class_id,
      successor_class:req.body.successor_class,
      successor_class_id:req.body.successor_class_id,
      created_by:req.body.created_by,
      launched_by:req.body.launched_by,
      retain: req.body.retain,
      retention_days: req.body.retention_days
  })
    .then(data => {
      if (!data) {
        return res.status(500).send({ message: "Params cannot be empty." });
      }
      if (data[1]==true){
        res.status(200).send({message:'Task Created.'})
      }
      else{
        res.status(200).send({message:'Task Exists.'})
      }
  })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
      
    });
};

exports.findOne = (req, res) => {
  const countryId = req.params.id;

  return Task.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Task not found." });
      }
      else{
        res.status(200).send(countryId);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
    });
    
    
};

exports.update = async(req, res) => {
  try{
  const countryId = req.params.id;
  const org = await Task.findByPk(countryId);

  if (!org) {
    return res.status(200).json({ message: 'Task not found' });
  }
  else{
    Task.update(
        {
          task_name: req.body.task_name,
          task_class:req.body.task_class,
          task_class_id: req.body.task_class_id,
          status: req.body.status,
          priority: req.body.priority,
          frequency: req.body.frequency,
          occurance_days: req.body.occurance_days,
          occurance_hours: req.body.occurance_hours,
          duration: req.body.duration,
          task_start_time: req.body.task_start_time,
          next_run_time: req.body.next_run_time,
          last_run_time: req.body.last_run_time,
          enabled: req.body.enabled,
          health:req.body.health,
          fail_count:req.body.fail_count,
          success_count:req.body.success_count,
          reset_count: req.body.reset_count,
          predecessor_class:req.body.predecessor_class,
          predecessor_class_id:req.body.predecessor_class_id,
          successor_class:req.body.successor_class,
          successor_class_id:req.body.successor_class_id,
          created_by:req.body.created_by,
          launched_by:req.body.launched_by,
          retain: req.body.retain,
          retention_days: req.body.retention_days
      },{
        where:{
          id: req.params.id,
        }
      })
        .then(data => {
          if (data == 1){
            res.status(200).send({message:'Task updated.'})
          }
          else{
            res.status(200).send({message:'Task does not exist.'})
          }
      })
  }
}
catch(err){
  res.status(500).json({ message: 'Please pass in all the required paramters.' });
}
};

exports.destroy = (req,res) => {
  const countryId = req.params.id;
  return Task.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Task Not found." });
      }
      else{
        Dataset.destroy({where:{id:req.params.id}});
        res.status(200).send({ message: "Task deleted!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
    });
};