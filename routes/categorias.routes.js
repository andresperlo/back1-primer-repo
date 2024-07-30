const { Router } = require('express')
const { obtenerLasCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias.controllers')
const router = Router()

router.get('/', obtenerLasCategorias)
router.get('/:idCategoria', obtenerCategoria)

router.post('/', crearCategoria)
router.put('/:idCategoria', actualizarCategoria)

router.delete('/:idCategoria', eliminarCategoria)

module.exports = router
