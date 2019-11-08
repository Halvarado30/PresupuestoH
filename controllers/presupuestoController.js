const mongoose = require("mongoose");
const Categoria = mongoose.model("Categorias");
const Usuario = mongoose.model("Usuario");

exports.mostrarTrabajos = async (req, res, next) => {
  // Obtener todos los documentos de los ingresos
  const losIngresos = await Categoria.find({
    tipo: "1",
    usuario: req.user._id
  });

  const losEgresos = await Categoria.find({
    tipo: "2",
    usuario: req.user._id
  });

  var ingreso = 0;
  for (x in losIngresos) {
    ingreso += losIngresos[x].cantidad;
  }

  var egreso = 0;
  for (y in losEgresos) {
    egreso += losEgresos[y].cantidad;
  }

  var restante = 0;
  var observacion = 0;
  restante = ingreso - egreso;
  if (restante > 0) {
    observacion = "Tus gastos no exceden el total de tus ingresos";
  } else {
    observacion = "Tus gastos exceden tus ingresos";
  }

  // Si no hay ingresos
  if (!losIngresos) return next();
  if (!losEgresos) return next();

  res.render("presupuesto", {
    nombrePagina: "",
    tagline: "",
    barra: true,
    boton: true,
    losIngresos,
    losEgresos,
    ingreso,
    egreso,
    restante,
    observacion,
    nombre: req.user.nombre
  });
};
