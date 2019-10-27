const express = require("express");
const router = express.Router();
const principalController = require("../controllers/principalController");
const usuarioController = require("../controllers/usuarioController");
const categoriasContoller = require("../controllers/categoriaController");

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
  return router;
};
