const db = require("../models");
const config = require("../config/auth.config");
const Dataset = db.dataset;

const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    
    Dataset.findAll()
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
  return Dataset.findOrCreate({
    where:{
      short_name:{[Op.like] :req.body.short_name}
    },
    defaults:{
      short_name: req.body.short_name,
      long_name: req.body.long_name,
      type: req.body.type,
      data_provider: req.body.data_provider,
      data_source_url: req.body.data_source_url,
      data_download_url: req.body.data_download_url,
      login_credentials_required: req.body.login_credentials_required,
      username: req.body.username,
      password: req.body.password,
      API_key: req.body.API_key,
      download_method: req.body.download_method,
      download_file_prefix: req.body.download_file_prefix,
      download_file_infix: req.body.download_file_infix,
      download_file_suffix: req.body.download_file_suffix,
      download_file_type: req.body.download_file_type,
      download_directory: req.body.download_directory,
      download_frequency: req.body.download_frequency,
      subset: req.body.subset,
      subset_region: req.body.subset_region
    }
  })
    .then(data => {
      if (!data) {
        return res.status(500).send({ message: "Params cannot be empty." });
      }
      if (data[1]==true){
        res.status(200).send({message:'Dataset Created.'})
      }
      else{
        res.status(200).send({message:'Dataset Exists.'})
      }
  })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
      
    });
};

exports.findOne = (req, res) => {

  const countryId = req.params.id;
  return Dataset.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Dataset not found." });
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
  const org = await Dataset.findByPk(countryId);

  if (!org) {
    return res.status(200).json({ message: 'Dataset not found' });
  }
  else{
    Dataset.update(
        {
        short_name: req.body.short_name,
        long_name: req.body.long_name,
        type: req.body.type,
        data_provider: req.body.data_provider,
        data_source_url: req.body.data_source_url,
        data_download_url: req.body.data_download_url,
        login_credentials_required: req.body.login_credentials_required,
        username: req.body.username,
        password: req.body.password,
        API_key: req.body.API_key,
        download_method: req.body.download_method,
        download_file_prefix: req.body.download_file_prefix,
        download_file_infix: req.body.download_file_infix,
        download_file_suffix: req.body.download_file_suffix,
        download_file_type: req.body.download_file_type,
        download_directory: req.body.download_directory,
        download_frequency: req.body.download_frequency,
        subset: req.body.subset,
        subset_region: req.body.subset_region
      },{
        where:{
          id: req.params.id,
        }
      })
        .then(data => {
          if (data == 1){
            res.status(200).send({message:'Dataset updated.'})
          }
          else{
            res.status(200).send({message:'Dataset does not exist.'})
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
  return Dataset.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Dataset Not found." });
      }
      else{
        Dataset.destroy({where:{id:req.params.id}});
        res.status(200).send({ message: "Dataset deleted!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
    });
};