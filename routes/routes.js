const Router = require('express').Router()
const validator = require("../config/validacion")
const passport = require("../config/passport")
const authUsers = require("../config/authRol")
const { verifedRol } = authUsers

const { getAllProducts, loadProduct, getOneProduct, modifyProduct } = require('../controllers/productControllers')
const { signInUser, signUpUser, signOutUser, verifyEmail, verificarToken, authenticated, infoUser } = require("../controllers/userController")
//rutas de usuarios

// rutas sigIn/signUp user
Router.route("/auth/signUp")
    .post(validator, signUpUser)

Router.route("/auth/signIn")
    .post(signInUser)

Router.route("/auth/signOut")
    .post(signOutUser)

Router.route("/user/info")
    .get(passport.authenticate("jwt", { session: false }), infoUser)

// rutas para verificar token y email
Router.route("/verify/:uniqueString")
    .get(verifyEmail)

Router.route("/auth/signInToken")
    .get(passport.authenticate("jwt", { session: false }), verificarToken)
// .get(passport.authenticate("jwt", { session: false }), verifedRol, verificarToken)  //EJEMPLO DE IMPLEMENTACION

Router.route("/auth/signInRol")
    .get(passport.authenticate("jwt", { session: false }), authenticated)

//Rutas de productos


Router.route('/allproducts')
    .get(getAllProducts)

Router.route('/allproducts/:id')
    .get(getOneProduct)
    .put(passport.authenticate('jwt', { session: false }), modifyProduct)
    .post(passport.authenticate("jwt", { session: false }), verifedRol, loadProduct)


module.exports = Router;