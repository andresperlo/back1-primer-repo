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

const obtenerUnProductoPorIdOTodos = (req, res) => {
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
}

const crearProducto =  (req, res) => {
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
}

const editarProductoPorId = (req, res) => {
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
}

const eliminarProductoPorId =  (req, res) => {
  try {
    const id = Number(req.params.idProducto)
    const productosNoBorrados = productos.filter((producto) => producto.id !== id)
    productos = productosNoBorrados
    res.status(200).json(productos)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  obtenerUnProductoPorIdOTodos,
  crearProducto,
  editarProductoPorId,
  eliminarProductoPorId
}