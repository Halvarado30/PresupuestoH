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

exports.formularioEdicion = (req, res) => {
  res.render("editarPerfil", {
    nombrePagina: "Edición de Perfil de usuario",
    usuario: req.user,
    cerrarSesion: true
    // nombre: req.user.nombre
  });
};

exports.editarPerfil = async (req, res) => {
  // Buscar el usuario
  const usuario = await Usuario.findById(req.user._id);

  // Modificar los valores
  usuario.nombre = req.body.nombre;
  usuario.email = req.body.email;
  usuario.apellido = req.body.apellido;
  usuario.telefono = req.body.telefono;

  if (req.body.password) {
    usuario.password = req.body.password;
  }

  // Guardar los cambios
  await usuario.save();

  req.flash("correcto", ["Cambios actualizados correctamente"]);

  // Redireccionar
  res.redirect("/");
};

// Mostrar el formulario de inicio de sesión
exports.inicioSesion = (req, res) => {
  res.render("iniciarSesion", {
    nombrePagina: "Iniciar Sesión"
  });
};
