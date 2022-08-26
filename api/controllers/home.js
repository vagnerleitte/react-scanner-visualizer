const uploadFile = require("../../config/upload")
const fs = require("fs")
const Component = require("../models/component")
const Child = require("../models/child")
const database = require("../../db");


module.exports = app => {
  const controller = {}

  controller.index = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/"
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return res.status(500).send({
          message: "Unable to scan files!",
          err
        });
      }
      let fileInfos = [];

      if(files === undefined) return res.status(200).send({ message: "No files found!" })

      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: directoryPath + file,
        });
      })
      res.status(200).send(fileInfos)
    });
  }

  controller.upload = async (req, res) => {
    try {
      await uploadFile(req, res);
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 2MB!",
        })
      }
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      })
    }
  }

  controller.download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/"
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        })
      }
    })
  };

  controller.components = async (req, res) => {
    const resultado = await database.sync();

    const resultList = await Component.findAll();

    return res.status(200).json(resultList);
  }

  controller.details = async (req, res) => {
    const resultado = await database.sync();

    const { id } = req.params;

    
    const resultList = await Component.findByPk(id);
    const componentData = {
      ...resultList.dataValues
    };
    
    if(resultList.id) {
      const childs = await Child.findAll({
        where: {parent_id: resultList.id}
      })
      console.log(resultList.id, childs)
      componentData.childs = childs
      
    }

    return res.status(200).json(componentData);
  }

  return controller
}
