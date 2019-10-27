const mongoose = require("mongoose");
const Categoria = mongoose.model("Categorias");
// renderizamos la pantalla principal para el administrador
exports.formularioCategoria = async (req, res) => {
  //renderizamos el dashboard principal del administrador.
  res.render("categorias", {
    nombrePagina: "Nueva categoria",
    tagline: "Llena el formulario"
  });
};

// Agregar una nueva categoria a la base de datos
exports.agregarCategoria = async (req, res) => {
  const categoria = new Categoria(req.body);

  // Agregrando el usuario que crea la categoria
  categoria.usuario = req.user._id;
  console.log(req.body);
  // Almacenar en la base de datos
  const nuevaCategoria = await categoria.save();

  // Redireccionar
  res.redirect("/");
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
