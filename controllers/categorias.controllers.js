const serviciosCategorias = require('../services/categorias.service')

const obtenerLasCategorias = async (req, res) => {
  try {

    const categorias = await serviciosCategorias.traerTodasLasCategorias()

    if (categorias.statusCode === 200) {
      res.status(200).json({ msg: categorias.msg })
    }

  } catch (error) {
    console.log(error)
  }
}

const obtenerCategoria = async (req, res) => {
  try {
    const categoria = await serviciosCategorias.traerUnaCategoria(req.params.idCategoria)

    if (categoria.statusCode === 200) {
      res.status(200).json({ msg: categoria.msg })
    }


  } catch (error) {
    console.log(error)
  }

}

const crearCategoria = async (req, res) => {
  try {

    const categoria = await serviciosCategorias.nuevaCategoria(req.body)

    if (categoria.statusCode === 201) {
      res.status(201).json({ msg: categoria.msg })
    }

  } catch (error) {
    console.log(error)
  }

}


const actualizarCategoria = async (req, res) => {
  try {

    const categoria = await serviciosCategorias.actualizarUnaCategoria(req.params.idCategoria, req.body)

    if (categoria.statusCode === 200) {
      res.status(200).json({ msg: categoria.msg })
    }


  } catch (error) {
    console.log(error)
  }

}

const eliminarCategoria = async (req, res) => {
  try {
    const categoria = await serviciosCategorias.borrarCategoria(req.params.idCategoria)

    if (categoria.statusCode === 200) {
      res.status(200).json({ msg: categoria.msg })
    }

  } catch (error) {
    console.log(error)
  }

}



module.exports = {
  obtenerCategoria,
  obtenerLasCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
}