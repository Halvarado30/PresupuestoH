const mongoose = require("mongoose");

exports.mostrarInicio = async (req, res, next) => {
  res.render("principal", {
    nombrePagina: "Presupuesto personal",
    tagline: "",
    barra: true,
    boton: true
  });
};
