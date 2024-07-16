const UsuarioModel = require("../models/usuario.schema")
const bcrypt = require('bcrypt')

const nuevoUsuario = async (body) => {
  try {
    const usuarioExiste = await UsuarioModel.findOne({nombreUsuario: body.nombreUsuario})

    if(usuarioExiste){
      return 400
    }

    if(body.rol !== 'usuario' && body.rol !== 'admin'){
      return 409
    }
    
    let salt = bcrypt.genSaltSync();
    body.contrasenia = bcrypt.hashSync(body.contrasenia, salt);

    

    const usuario = new UsuarioModel(body)
    await usuario.save()
    return 201
  } catch (error) {
    console.log(error)
  }
}

const inicioSesion = async(body) => {
try {

  const usuarioExiste = await UsuarioModel.findOne({nombreUsuario: body.nombreUsuario})

  if(!usuarioExiste){
    return 400
  }

  const verificacionContrasenia = bcrypt.compareSync(body.contrasenia, usuarioExiste.contrasenia)

  if(verificacionContrasenia){
    return 200
  }else{
    return 400
  }

  
  
} catch (error) {
  console.log(error)
}
}

const obtenerTodosLosUsuarios = async () => {
  try {
    const usuarios = await UsuarioModel.find()
    return usuarios
  } catch (error) {
    console.log(error)
  }
}

const obtenerUnUsuario = async (idUsuario) => {
  try {
    const usuario = await UsuarioModel.findOne({ _id: idUsuario })
    return usuario
  } catch (error) {
    console.log(error)
  }
}

const bajaUsuarioFisica = async (idUsuario) => {

  await UsuarioModel.findByIdAndDelete({ _id: idUsuario })
  return 200
}

const bajaUsuarioLogica = async (idUsuario) => {
  const usuario = await UsuarioModel.findOne({ _id: idUsuario })
  usuario.bloqueado = !usuario.bloqueado

  const actualizarUsuario = await UsuarioModel.findByIdAndUpdate({ _id: idUsuario }, usuario, { new: true })
  return actualizarUsuario
}


module.exports = {
  nuevoUsuario,
  inicioSesion,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  bajaUsuarioFisica,
  bajaUsuarioLogica
}