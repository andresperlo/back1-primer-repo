const { Schema, model } = require('mongoose')

const UsuarioSchema = new Schema({
  nombreUsuario:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  contrasenia: {
    type: String,
    required: true,
    trim:true
  },

  rol: {
    type: String,
    default: 'usuario',
  },

  bloqueado:{
    type:Boolean,
    default: false
  }
})

const UsuarioModel = model('user', UsuarioSchema)
module.exports = UsuarioModel