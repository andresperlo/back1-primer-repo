const express = require('express')
const { obtenerUnProductoPorIdOTodos, crearProducto, editarProductoPorId, eliminarProductoPorId } = require('../controllers/productos.controllers')
const router = express.Router()

/* GET - Obtener*/
router.get('/', obtenerUnProductoPorIdOTodos)

/* POST - Crear */
router.post('/', crearProducto)

/* PUT - Editar */
router.put('/:idProducto', editarProductoPorId)

/* DELETE  - Borrar */
router.delete('/:idProducto', eliminarProductoPorId)

module.exports = router