const ProductModel = require('../models/producto.schema')
const cloudinary = require('../helpers/cloudinary')
const UsuarioModel = require('../models/usuario.schema')
const CarritoModel = require('../models/carrito.schema')
const FavModel = require('../models/favoritos.schema')
const { MercadoPagoConfig, Preference } = require('mercadopago')

const obtenerTodosLosProductos = async(limit, to) => {
  const [productos, cantidadTotal  ] = await Promise.all([
    ProductModel.find({activo:true}).skip(to * limit).limit(limit),
    ProductModel.countDocuments({activo: true})
  ]) 

  const paginacion = {
    productos,
    cantidadTotal
  }

  return paginacion
}

const obtenerUnProducto = async(id) => {
  const producto = await ProductModel.findById({_id: id})
  return producto
}

const buscarProducto = async (termino) => {
  const reglaBusqueda = new RegExp(termino, 'i')
  const productos = await ProductModel.find({
    $or: [
      {nombre: reglaBusqueda},
      {descripcion: reglaBusqueda}
    ]
  })
  return productos
}

const nuevoProducto = (body) => {
  try {
     const newProduct = new ProductModel(body)
     return newProduct
   /*  const nuevoProducto = {
      id: productos[productos.length - 1].id + 1,
      ...body
    }

    productos.push(nuevoProducto)
    return nuevoProducto */
  } catch (error) {
    console.log(error)
  }
}

const editarProducto = async(idProducto, body) => {
  try {
    const productoEditado = await ProductModel.findByIdAndUpdate({_id: idProducto}, body, {new:true})
    return productoEditado
  } catch (error) {
    console.log(error)
  }
}

const eliminarProducto = async(idProducto) => {
  try {
    await ProductModel.findByIdAndDelete({_id: idProducto})
    return 200
  } catch (error) {
    console.log(error)
  }
}

const agregarImagen = async(idProducto, file) => {
  const producto = await ProductModel.findOne({_id: idProducto})
  const resultado = await cloudinary.uploader.upload(file.path)

  producto.imagen = resultado.secure_url
  await producto.save()

  return 200
}

const agregarProducto = async (idUsuario, idProducto) => {
   const usuario = await UsuarioModel.findById(idUsuario)
   const producto = await ProductModel.findOne({_id: idProducto})
   const carrito = await CarritoModel.findOne({_id: usuario.idCarrito})

   const productoExiste = carrito.productos.find((prod) => prod._id.toString() === producto._id.toString())

   if(productoExiste){
    return {
      msg:'Producto ya existe en el carrito',
      statusCode: 400
    }
   }

   carrito.productos.push(producto)
   await carrito.save()

   return {
    msg:'Producto cargado correctamente en el carrito',
    statusCode: 200
   }
}

const quitarProducto = async (idUsuario, idProducto) => {
  const usuario = await UsuarioModel.findById(idUsuario)
  const producto = await ProductModel.findOne({_id: idProducto})
  const carrito = await CarritoModel.findOne({_id: usuario.idCarrito})

  const posicionProducto = carrito.productos.findIndex((prod) => prod._id.toString() === producto._id.toString())

  if(posicionProducto < 0){
    return {
      msg:'No se encontro el producto que buscas',
      statusCode: 400
    }
   }
  

  carrito.productos.splice(posicionProducto, 1)
  
  await carrito.save()

  return {
   msg:'Producto eliminado correctamente del carrito',
   statusCode: 200
  }
}

const agregarProductoFav = async (idUsuario, idProducto) => {
  const usuario = await UsuarioModel.findById(idUsuario)
  const producto = await ProductModel.findOne({_id: idProducto})
  const favoritos = await FavModel.findOne({_id: usuario.idFavoritos})

  const productoExiste = favoritos.productos.find((prod) => prod._id.toString() === producto._id.toString())

  if(productoExiste){
   return {
     msg:'Producto ya existe en Favoritos',
     statusCode: 400
   }
  }

  favoritos.productos.push(producto)
  await favoritos.save()

  return {
   msg:'Producto cargado correctamente a Favoritos',
   statusCode: 200
  }
}

const quitarProductoFav = async (idUsuario, idProducto) => {
 const usuario = await UsuarioModel.findById(idUsuario)
 const producto = await ProductModel.findOne({_id: idProducto})
 const favoritos = await FavModel.findOne({_id: usuario.idFavoritos})

 const posicionProducto = favoritos.productos.findIndex((prod) => prod._id.toString() === producto._id.toString())

 
 if(posicionProducto < 0){
  return {
    msg:'No se encontro el producto que buscas',
    statusCode: 400
  }
 }

 favoritos.productos.splice(posicionProducto, 1)
 
 await favoritos.save()

 return {
  msg:'Producto eliminado correctamente de Favoritos',
  statusCode: 200
 }
}

const pagoConMP = async (body) => {
  const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN})
  const preference = new Preference(client)
  const result = await preference.create({
    body: {
      items:[
        {
          title:'cel 1',
          quantity: 1,
          unit_price: 150000,
          currency_id:'ARS'
        },
        {
          title:'cel 2',
          quantity: 1,
          unit_price: 150000,
          currency_id:'ARS'
        },
      ],
      back_urls: {
        success:'myApp.netlify.com/carrito/success',
        failure:'myApp.netlify.com/carrito/failure',
        pending:'myApp.netlify.com/carrito/pending'
      },
      auto_return: 'approved'
    }
  })

  return {
    result,
    statusCode: 200
  }
  
}

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  nuevoProducto,
  editarProducto,
  eliminarProducto,
  agregarImagen,
  buscarProducto,
  agregarProducto,
  quitarProducto,
  agregarProductoFav,
  quitarProductoFav,
  pagoConMP
}
