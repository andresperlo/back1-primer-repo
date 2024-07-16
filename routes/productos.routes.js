const express = require('express')
const { obtenerUnProductoPorIdOTodos, crearProducto, editarProductoPorId, eliminarProductoPorId } = require('../controllers/productos.controllers')
const { check } = require('express-validator')
const auth = require('../middlewares/auth')
const router = express.Router()

/* GET - Obtener*/
router.get('/', obtenerUnProductoPorIdOTodos)

/* POST - Crear */
router.post('/', [
  check('nombre', 'campo NOMBRE vacio').not().isEmpty(),
  check('precio', 'campo PRECIO vacio').not().isEmpty(),
  check('descripcion', 'campo DESCRIPCION vacio').not().isEmpty(),
], auth('admin'), crearProducto)

/* PUT - Editar */
router.put('/:idProducto',
  [
    check('nombre', 'campo NOMBRE vacio').not().isEmpty(),
    check('precio', 'campo PRECIO vacio').not().isEmpty(),
    check('descripcion', 'campo DESCRIPCION vacio').not().isEmpty(),
  ], auth('admin'), editarProductoPorId)

/* DELETE  - Borrar */
router.delete('/:idProducto', auth('admin'), eliminarProductoPorId)

module.exports = router