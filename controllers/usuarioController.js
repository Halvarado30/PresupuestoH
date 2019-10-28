const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const { validationResult } = require("express-validator");
const multer = require("multer");
const shortid = require("shortid");

// Caraga el formulario para la creación de una cuenta de usuario
exports.formularioCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crea tu cuenta"
  });
};

exports.crearUsuario = async (req, res, next) => {
  console.log(req.body);

  // Verificar que no existan errores de validación
  const errores = validationResult(req);
  const erroresArray = [];

  // si hay errores
  if (!errores.isEmpty()) {
    errores.array().map(error => erroresArray.push(error.msg));

    // Enviar los errores de regreso al usuario
    req.flash("error", erroresArray);

    res.render("crearCuenta", {
      nombrePagina: "Crea tu cuenta",
      tagline: "¡Empieza de una vez",
      messages: req.flash()
    });

    return;
  }

  const usuario = new Usuario(req.body);

  // Almacenar registro de usuario
  try {
    await usuario.save();
    console.log("Registro almacenado correctamente");
    res.redirect("/iniciarSesion");
  } catch (error) {
    erroresArray.push(error);
    req.flash("error", erroresArray);

    res.render("crearCuenta", {
      nombrePagina: "Crea tu cuenta",
      tagline: "¡Comienza de una vez!",
      messages: req.flash()
    });
  }
};

// Mostrar el formulario de inicio de sesión
exports.inicioSesion = (req, res) => {
  res.render("iniciarSesion", {
    nombrePagina: "Iniciar Sesión"
  });
};
