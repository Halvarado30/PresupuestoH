const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuarios");
const { vakudationResult } = require("express-validator");
const multer = require("multer");
const shortid = require("shortid");

// Caraga el formulario para la creación de una cuenta de usuario
exports.formularioCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crea tu cuenta"
  });
};

// Mostrar el formulario de inicio de sesión
exports.inicioSesion = (req, res) => {
  res.render("iniciarSesion", {
    nombrePagina: "Iniciar Sesión"
  });
};
