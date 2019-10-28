const mongoose = require("mongoose");
const Categoria = mongoose.model("Categorias");
const { validationResult } = require("express-validator");

// renderizamos la pantalla principal para el administrador
exports.formularioCategoria = async (req, res) => {
  res.render("categorias", {
    nombrePagina: "Nueva categoria",
    tagline: "Llena el formulario"
  });
};

// Agregar una nueva categoria a la base de datos
exports.agregarCategoria = async (req, res) => {
  const errores = validationResult(req);
  const erroresArray = [];

  // Si hay errores
  if (!errores.isEmpty()) {
    errores.array().map(error => erroresArray.push(error.msg));

    // Enviar los errores de regreso al usuario
    req.flash("error", erroresArray);

    res.render("categorias", {
      nombrePagina: "Nueva categoria",
      tagline: "¡Llena el formulario, por favor!",
      messages: req.flash()
    });
    return;
  }

  const categoria = new Categoria(req.body);

  // Agregando el usuario que crea la categoria
  categoria.usuario = "req.user._id";
  console.log(req.body);

  try {
    await categoria.save();
    res.redirect("/categoria/nuevaCategoria");
  } catch (error) {
    erroresArray.push(error);
    req.flash("error", erroresArray);

    res.render("categorias", {
      nombrePagina: "Nueva categoria",
      tagline: "¡Llena el formulario, por favor!",
      messages: req.flash()
    });
  }
};

// Mostrar una cuenta
exports.mostrarCategoria = async (req, res, next) => {
  const categoria = await Categoria.findOne({ url: req.params.url });

  // Si no hay resultados
  if (!categoria) return next();

  res.render("cuenta", {
    nombrePagina: categoria.nombre,
    categoria
  });
};
