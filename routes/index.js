const express = require("express");
const router = express.Router();
const principalController = require("../controllers/principalController");
const usuarioController = require("../controllers/usuarioController");
const categoriasContoller = require("../controllers/categoriaController");
const authController = require("../controllers/authController");
const prespuestoController = require("../controllers/presupuestoController");
const { check } = require("express-validator");

module.exports = () => {
  router.get(
    "/",
    authController.verificarUsuario,
    principalController.mostrarInicio
  );

  router.get(
    "/principal",
    authController.verificarUsuario,
    principalController.mostrarInicio
  );

  // Categorias
  router.get(
    "/categoria/nuevaCategoria",
    authController.verificarUsuario,
    categoriasContoller.formularioCategoria
  );
  router.get("/crearCuenta", usuarioController.formularioCrearCuenta);
  router.post(
    "/categoria/nuevaCategoria",
    authController.verificarUsuario,
    categoriasContoller.agregarCategoria
  );

  // Presupuesto
  router.get(
    "/presupuesto",
    authController.verificarUsuario,
    prespuestoController.mostrarTrabajos
  );

  // Login
  router.get("/iniciarSesion", usuarioController.inicioSesion);
  router.post("/iniciarSesion", authController.autenticarUsuario);
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

  router.get("/cerrarSesion", authController.cerrarSesion);

  router.get("/editarPerfil", usuarioController.formularioEdicion);
  router.post(
    "/editarPerfil",
    usuarioController.subirImagen,
    usuarioController.editarPerfil
  );

  // Restablecer la contraseña del usuario de presupuesto
  router.get(
    "/restablecerPassword",
    authController.formularioRestablecerPassword
  );
  router.post("/restablecerPassword", authController.enviarToken);
  router.get(
    "/restablecerPassword/:token",
    authController.formularioNuevaPassword
  );
  router.post(
    "/restablecerPassword/:token",
    authController.almacenarNuevaPassword
  );
  return router;
};
