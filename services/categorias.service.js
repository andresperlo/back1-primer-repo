const CategoriasModel = require("../models/categorias.schema")

const nuevaCategoria = async(body) => {
  const categoria = new CategoriasModel(body)
  await categoria.save()
  return{
    msg:'Categoria agregada',
    statusCode: 201
  }
}

const traerTodasLasCategorias = async () => {
  const categrias = await CategoriasModel.find()
  return{
    categrias,
    statusCode: 200
  }
}

const traerUnaCategoria = async(idCategoria) => {
  const categoria = await CategoriasModel.findById(idCategoria)
  return {
    categoria,
    statusCode: 200
  }
}

const actualizarUnaCategoria = async (idCategoria, body) => {
  const categoriaActualizada = await CategoriasModel.findByIdAndUpdate({_id: idCategoria}, body, {new: true})
  return{
    msg:'Categoria actualizada',
    categoriaActualizada,
    statusCode: 200
  }  
}

const borrarCategoria = async(idCategoria) => {
  await CategoriasModel.findByIdAndDelete({_id: idCategoria})
  return{
    msg:'Producto borrado',
    statusCode: 200
  }
}

module.exports = {
nuevaCategoria,
traerTodasLasCategorias,
traerUnaCategoria,
actualizarUnaCategoria,
borrarCategoria
}