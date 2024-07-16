const { Router } = require('express')
const { registrarUsuario, obtenerTodosLosUsuarios, obtenerUnUsuario, bajaFisicaUsuario, bajaLogicaUsuario, iniciarSesionUsuario } = require('../controllers/usuarios.controllers')
const router = Router()
const { check } = require('express-validator')

router.post('/', [
  check('nombreUsuario', 'Campo USUARIO esta vacio').not().isEmpty(),
  check('nombreUsuario', 'min:5 caracteres y max: 40 caracteres').isLength({min:5, max: 40}),
  check('contrasenia', 'Campo CONTRASEÑA esta vacio').not().isEmpty(),
  check('contrasenia', 'min: 8 caracteres y max: 50 caracteres').isLength({min:8, max: 50})
/*   check('nombreUsuario', 'Formato incorrecto: Tiene que ser un email').isEmail() */
], registrarUsuario)
router.post('/login', [
  check('nombreUsuario', 'Campo USUARIO esta vacio').not().isEmpty(),
  check('contrasenia', 'Campo CONTRASEÑA esta vacio').not().isEmpty(),
], iniciarSesionUsuario)
router.get('/', obtenerTodosLosUsuarios)
router.get('/:idUsuario', [
/*   check('_id', 'Formato ID incorrecto').isMongoId() */
], obtenerUnUsuario)
router.delete('/:idUsuario', bajaFisicaUsuario)
router.put('/:idUsuario', bajaLogicaUsuario)

module.exports = router