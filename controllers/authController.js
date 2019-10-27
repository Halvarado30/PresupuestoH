const passport = require("passport");
const mongoose = require("mongoose");

exports.autenticarUsuario = passport.authenticate("local", {
  //   successRedirect: "/controPersonal",
  //   failureRedirect: "/iniciarSesion",
  //   failureFlash: true,
  //   badRequestMessage: ["Debes ingresar ambas credenciales"]
});

// Cerrar la sesión del usuario actual
exports.cerrarSesion = (req, res) => {
  // Cierra la sesión actual
  req.logout();

  req.flash("correcto", ["Has cerrado tu sesión. ¡Vuelve pronto!"]);

  return res.redirect("/iniciarSesion");
};

// Verificar si el usuario se encuentra autenticado
exports.verificarUsuario = (req, res, next) => {
  // Retorna true si el usuario ya realizó la autenticación
  if (req.isAuthenticated()) {
    return next();
  }

  // Si no se autenticó, redirecccionarlo al inicio de sesión

  res.redirect("/iniciarSesion");
};
