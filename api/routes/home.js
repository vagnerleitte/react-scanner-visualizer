const path = require("path")

module.exports = (app) => {
  const controller = app.controllers.home
  const manager = app.controllers.manager

  console.log(app.controllers);

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
  });

  app.route("/api/v1/home").get(controller.index);

  app.route("/api/v1/components/:file").get(controller.components)
  app.route("/api/v1/component/:id").get(controller.details)

  app.route("/api/v1/upload").post(controller.upload)

  app.route("/api/v1/file-download/:file").get(controller.download)

  app.route("/api/v1/process-file/:file").get(manager.extractData)
};
