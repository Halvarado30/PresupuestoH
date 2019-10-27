const express = require("express");
const router = express.Router();
const principalController = require("../controllers/principalController");
const usuarioController = require("../controllers/usuarioController");
const categoriasContoller = require("../controllers/categoriaController");

module.exports = () => {
  router.get("/", principalController.mostrarInicio);
  router.get("/nueva_categoria", categoriasContoller.mostrarCategoria);
  router.get("/crearCuenta", usuarioController.formularioCrearCuenta);
  router.get("/iniciarSesion", usuarioController.inicioSesion);
  return router;
};
