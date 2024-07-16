const express = require('express')
const { obtenerUnProductoPorIdOTodos, crearProducto, editarProductoPorId, eliminarProductoPorId } = require('../controllers/productos.controllers')
const { check } = require('express-validator')
const router = express.Router()

/* GET - Obtener*/
router.get('/', obtenerUnProductoPorIdOTodos)

/* POST - Crear */
router.post('/', [
  check('nombre', 'campo NOMBRE vacio').not().isEmpty(),
  check('precio', 'campo PRECIO vacio').not().isEmpty(),
  check('descripcion', 'campo DESCRIPCION vacio').not().isEmpty(),
], crearProducto)

/* PUT - Editar */
router.put('/:idProducto',
  [
    check('nombre', 'campo NOMBRE vacio').not().isEmpty(),
    check('precio', 'campo PRECIO vacio').not().isEmpty(),
    check('descripcion', 'campo DESCRIPCION vacio').not().isEmpty(),
  ], editarProductoPorId)

/* DELETE  - Borrar */
router.delete('/:idProducto', eliminarProductoPorId)

module.exports = router