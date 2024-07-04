const db = require("../models");
const config = require("../config/auth.config");
const Log = db.log;
const Task = db.task;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    
    Log.findAll()
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
    return Log.create({
      task_class:req.body.task_class,
      task_class_id:req.body.task_class_id,
        status: req.body.status,
        details: req.body.details
    })
      .then(async(data) => {
        if (!data) {
          return res.status(500).send({ message: "Params cannot be empty." });
        }
        else{
            data.setDownloadTask(req.body.task_id);
            res.status(200).send({message:'Log Created.'})
        }
    })
      .catch((err) => {
        res.status(500).send({ message: "An Error Occurred."+err });
        
      });
  };

exports.findOne = (req, res) => {

  const countryId = req.params.id;
  return Log.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Log not found." });
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
  const org = await Log.findByPk(countryId);

  if (!org) {
    return res.status(200).json({ message: 'Log not found' });
  }
  else{
    Log.update(
        {
        task_class:req.body.task_class,
        task_class_id:req.body.task_class_id,
        status: req.body.status,
        details: req.body.details
      },{
        where:{
          id: req.params.id,
        }
      })
        .then(data => {
          if (data == 1){
            res.status(200).send({message:'Log updated.'})
          }
          else{
            res.status(200).send({message:'Log does not exist.'})
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
  return Log.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Log Not found." });
      }
      else{
        Log.destroy({where:{id:req.params.id}});
        res.status(200).send({ message: "Log deleted!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
    });
};