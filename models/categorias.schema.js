const { Schema, model } = require('mongoose')

const CategoriasSchema = new Schema({
  nombre:{
    type: String,
    required: true,
    unique: true
  }
})

const CategoriasModel = model('category', CategoriasSchema)
module.exports = CategoriasModel