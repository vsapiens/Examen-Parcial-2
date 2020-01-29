let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let jsonParser = bodyParser.json();
let { bookmarkController } = require("./model");
let { DATABASE_URL, PORT } = require("./config");

let app = express();

let server;

app.get("/api/bookmarks/:id", jsonParser, (req, res) => {
  let idBody = req.body.id;
  let idParam = req.params.id;

  if (!idBody) {
    res.statusMessage = "El id no ha sido enviado en el cuerpo del mensaje";
    return res.status(406).send();
  }

  if (idBody !== idParam) {
    res.statusMessage = "Los ids no coinciden";
    return res.status(409).send();
  }
  if (req.body.length === 1) {
    res.statusMessage = "Añadir más parámetros";
    return res.status(406).send();
  }
  bookmarkController.findByID(idBody).then(bm => {
    if (!bm) {
      res.statusMessage = "No existe el id";
      return res.status(400).send();
    }

    let newBookmark = {
      titulo: req.body.titulo || bm.titulo,
      descripcion: req.body.descripcion || bm.descripcion,
      url: req.body.url || bm.url
    };

    bookmarkController
      .updateByID(idBody, newBookmark)
      .then(bm => {
        return res.status(200).send(newBookmark);
      })
      .catch(error => {
        throw new Error(err);
      });
  });
});

function runServer(port, databaseUrl) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, response => {
      if (response) {
        return reject(response);
      } else {
        server = app
          .listen(port, () => {
            console.log("App is running on port " + port);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            return reject(err);
          });
      }
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing the server");
      server.close(err => {
        if (err) {
          return reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}
runServer(PORT, DATABASE_URL);

module.exports = {
  app,
  runServer,
  closeServer
};
