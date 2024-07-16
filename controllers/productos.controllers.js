const { validationResult } = require('express-validator')
const serviciosProductos = require('../services/productos.services')

const obtenerUnProductoPorIdOTodos = async(req, res) => {
  try {
    const id = req.query.id  
    const limit = req.query.limit || 10
    const to = req.query.to || 0
    
    if (id) {
      const producto = await serviciosProductos.obtenerUnProducto(id)
      res.status(200).json(producto)
    } else {
      const productos = await serviciosProductos.obtenerTodosLosProductos(limit, to)

      res.status(200).json(productos)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const crearProducto = async (req, res) => {
  try {
    const { errors } = validationResult(req)
    
    if (errors.length) {
      return res.status(400).json({ msg: errors[0].msg })
    }

    const nuevoProducto = await serviciosProductos.nuevoProducto(req.body)
    await nuevoProducto.save()
    res.status(201).json(nuevoProducto)

  } catch (error) {
    res.status(500).json(error)
  }
}

const editarProductoPorId = async(req, res) => {
  try {
    const { errors } = validationResult(req)
    
    if (errors.length) {
      return res.status(400).json({ msg: errors[0].msg })
    }

    const id = req.params.idProducto
    const productoActualizado = await  serviciosProductos.editarProducto(id, req.body)
    res.status(200).json(productoActualizado)
  } catch (error) {
    res.status(500).json(error)
  }
}

const eliminarProductoPorId = async(req, res) => {
  try {
    const id = req.params.idProducto
    let res = await serviciosProductos.eliminarProducto(id)

    if (res === 200) {
      res.status(200).json({ msg: 'Producto eliminado' })
    }

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