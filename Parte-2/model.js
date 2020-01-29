let mongoose = require("mongoose");
let uuid = require("uuid");

mongoose.Promise = global.Promise;

/* Tu código va aquí */
let bookmarkCollection = mongoose.Schema({
  id: { type: String },
  titulo: { type: String },
  descripcion: { type: String },
  url: { type: String }
});

let Bookmark = mongoose.model("bookmarks", bookmarkCollection);

let bookmarkController = {
  updateByID: function(id, newBookmark) {
    Bookmark.findOneAndUpdate({ id: id }, newBookmark)
      .then(bm => {
        return bm;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  findByID: function(id) {
    Bookmark.findOne({ id: id })
      .then(bm => {
        return bm;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
};

module.exports = { bookmarkController };
