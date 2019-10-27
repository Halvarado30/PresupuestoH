const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

const categoriaSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true
  },
  nombre: {
    type: String,
    trim: true
  },
  cantidad: {
    type: String,
    trim: true
  },
  tipo: {
    type: String,
    trim: true
  },
  usuario: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    lowercase: true
  }
});

module.exports = mongoose.model("Categorias", categoriaSchema);
