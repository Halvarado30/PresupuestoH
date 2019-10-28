const express = require("express");
const router = express.Router();
const principalController = require("../controllers/principalController");
const usuarioController = require("../controllers/usuarioController");
const categoriasContoller = require("../controllers/categoriaController");
const { check } = require("express-validator");

module.exports = () => {
  router.get("/", principalController.mostrarInicio);
  router.get(
    "/categoria/nuevaCategoria",
    categoriasContoller.formularioCategoria
  );
  router.get("/crearCuenta", usuarioController.formularioCrearCuenta);
  router.post(
    "/categoria/nuevaCategoria",
    categoriasContoller.agregarCategoria
  );
  router.get("/iniciarSesion", usuarioController.inicioSesion);
  router.get("/categoria/:url", categoriasContoller.mostrarCategoria);

  // Crear un usuario
  router.get("/crearCuenta", usuarioController.formularioCrearCuenta);
  router.post(
    "/crearCuenta",
    [
      // Verificar los atributos del formulario
      check("nombre", "El nombre de usuario es requerido.")
        .not()
        .isEmpty()
        .escape(),
      check("apellido", "El apellido de usuario es requerido.")
        .not()
        .isEmpty()
        .escape(),
      check("email", "El correo electrónico es requerido.")
        .not()
        .isEmpty(),
      check("email", "El correo electrónico no es vålido.")
        .isEmail()
        .normalizeEmail(),
      check("password", "La contraseña es requerida.")
        .not()
        .isEmpty(),
      check("confirmpassword", "Debe ingresar la confirmación de tu contraseña")
        .not()
        .isEmpty(),
      check(
        "confirmpassword",
        "La confirmación de la contraseña no coincide con tu contraseña"
      ).custom((value, { req }) => value === req.body.password)
    ],
    usuarioController.crearUsuario
  );
  return router;
};
