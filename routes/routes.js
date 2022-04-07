const Router = require('express').Router()
const validator = require("../config/validacion")
const passport = require("../config/passport")
const verifedRol = require("../config/authRol")


//rutas de usuarios
const { signInUser, signUpUser, signOutUser, verifyEmail, verificarToken } = require("../controllers/userController")

// rutas sigIn/signUp user
Router.route("/auth/signUp")
    .post(validator, signUpUser)

Router.route("/auth/signIn")
    .post(signInUser)

Router.route("/auth/signOut")
    .post(signOutUser)

// rutas para verificar token y email
Router.route("/verify/:uniqueString")
    .get(verifyEmail)

Router.route("/auth/signInToken")
    .get(passport.authenticate("jwt", { session: false }), verificarToken)
// .get(passport.authenticate("jwt", { session: false }), verifedRol, verificarToken)   EJEMPLO DE IMPLEMENTACION



//Rutas de productos
const { getAllProducts, loadProduct, getOneProduct, modifyStock } = require('../controllers/productControllers')


Router.route('/allproducts')
    .get(getAllProducts)
    .post(loadProduct)

Router.route('/allproducts/:id')
    .get(getOneProduct)
    .put(passport.authenticate('jwt', { session: false }), modifyStock)


module.exports = Router;