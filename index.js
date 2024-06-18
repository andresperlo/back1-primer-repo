const express = require('express')
const app = express()
const path = require('path')

const PORT = 3001

/* middlewares */
app.use(express.json())
/* archivos estaticos  */
app.use(express.static(path.join(__dirname, 'public')))
console.log()
let productos = [
  {
    id: 1,
    nombre: 'Celular',
    precio: 100000
  },
  {
    id: 2,
    nombre: 'Tablet',
    precio: 120000
  }
]

/* 
Verbos: GET - POST - PUT - DELETE

*/

/* app.get('/', middleware , () => {  }) */

/* GET - Obtener*/
app.get('/api/productos', (req, res) => {
  try {
    /* Request - Es la peticion que el front nos envia al back*/
    /* Response - Es la repuesta del back al front */
    /* response - status - formato */
    const id = Number(req.query.id)

    if (id) {
      const producto = productos.find((prod) => prod.id === id)
      res.status(200).json(producto)
    } else {
      res.status(200).json(productos)
    }
  } catch (error) {
    /* response - status - formato */
    res.status(500).json(error)
  }
})

//app.get('/api/productos/:idProducto', (req, res) => {
/* req - body - params - query */
/* params - parametro
/api/productos/:parametro

query - dato - ?
req.query.id
req.query.nombre
 
*/
/*  const id = Number(req.params.idProducto)
 const producto = productos.find((prod) => prod.id === id)
 res.status(200).json(producto)
}) */

/* POST - Crear */
app.post('/api/productos', (req, res) => {
  try {
    /* const dataProducto = req.body */
    //const {nombre, precio} = req.body
    /* spread operator ... */

    console.log(req.body)
    const nuevoProducto = {
      id: productos[productos.length - 1].id + 1,
      ...req.body
    }
    console.log(nuevoProducto)
    productos.push(nuevoProducto)

    res.status(201).json(nuevoProducto)

  } catch (error) {
    res.status(500).json(error)
  }
})

/* PUT - Editar */
app.put('/api/productos/:idProducto', (req, res) => {
  try {
    const id = Number(req.params.idProducto)
    const posicionProductoEnElArray = productos.findIndex((producto) => producto.id === id)

    const productoEditado = {
      id,
      ...req.body
    }

    productos[posicionProductoEnElArray] = productoEditado

    res.status(200).json(productos[posicionProductoEnElArray])

  } catch (error) {
    res.status(500).json(error)
  }
})

/* DELETE  - Borrar */
app.delete('/api/productos/:idProducto', (req, res) => {
  try {
    const id = Number(req.params.idProducto)
    const productosNoBorrados = productos.filter((producto) => producto.id !== id)
    productos = productosNoBorrados 
    res.status(200).json(productos)
  } catch (error) {
    res.status(500).json(error)
  }
})
app.listen(PORT, () => {
  console.log('server ok ', PORT)
})