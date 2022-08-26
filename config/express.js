const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const consign = require("consign")

module.exports = () => {
  const app = express()

  var corsOptions = {
    origin: "http://localhost:8081",
  }

  app.use(cors(corsOptions))

  app.set("port", process.env.PORT || config.get("server.port"))

  app.use(express.urlencoded({ extended: true }))

  app.use(bodyParser.json({ limit: "50mb" }))

  app.use(express.static('public'))

  consign({ cwd: "api" }).then("controllers").then("services").then("routes").into(app)

  return app
}
