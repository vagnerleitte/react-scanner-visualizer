const fs = require('fs')

module.exports = app => {
  const controller = {}

  controller.extractData = async (req, res) => { 
    const directoryPath = __basedir + "/resources/static/assets/uploads/"

    if(!req.params.file) {
      return res.status(404).send({ message: "filename not provided"})
    }
    const fileName = directoryPath + req?.params.file

    await fs.readFile(fileName, 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: "Uncaught error!", err})
      }

      // await app.services.dependencyFile.getComponentNames(data)

      await app.services.dependencyFile.getDependencies(data)
      

      return res.status(200).send("ok")
    });

  }

  return controller
}