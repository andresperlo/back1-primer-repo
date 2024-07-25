const express = require('express')
const { obtenerUnProductoPorIdOTodos, crearProducto, editarProductoPorId, eliminarProductoPorId, agregarImagenProductoPorId, buscarProductoPorTermino, agregarProductoAlCarrito, borrarProductoCarrito, agregarProductoAlFavoritos, borrarProductoFavoritos } = require('../controllers/productos.controllers')
const { check } = require('express-validator')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const router = express.Router()

/* GET - Obtener*/
router.get('/', obtenerUnProductoPorIdOTodos)
router.get('/buscar', buscarProductoPorTermino)
/* POST - Crear */
router.post('/', [
  check('nombre', 'campo NOMBRE vacio').not().isEmpty(),
  check('precio', 'campo PRECIO vacio').not().isEmpty(),
  check('descripcion', 'campo DESCRIPCION vacio').not().isEmpty(),
], auth('admin'), crearProducto)

router.post('/agregarProductoCarrito/:idProducto', auth('usuario'), agregarProductoAlCarrito)
router.post('/quitarProductoCarrito/:idProducto', auth('usuario'), borrarProductoCarrito)

router.post('/agregarProductoFav/:idProducto', auth('usuario'), agregarProductoAlFavoritos)
router.post('/quitarProductoFav/:idProducto', auth('usuario'), borrarProductoFavoritos)


router.post('/agregarImagen/:idProducto', multer.single('imagen'),agregarImagenProductoPorId)

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
