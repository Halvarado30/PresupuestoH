const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    unique: true
  },
  cantidad: {
    type: Number,
    default: 0,
    trim: true
  },
  tipo: {
    type: String,
    trim: true
  },
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",
    required: "Usuario obligatorio"
  },
  url: {
    type: String,
    lowercase: true
  }
});

// Hooks para generar la URL (en Mongoose se conoce como middleware)
categoriaSchema.pre("save", function(next) {
  // Crear la URL
  const url = slug(this.nombre);
  this.url = `${url}-${shortid.generate()}`;

  next();
});

module.exports = mongoose.model("Categorias", categoriaSchema);
