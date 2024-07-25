const {Schema, model} = require('mongoose')

const FavSchema = new Schema({
  idUsuario:{
    type: String
  },
  productos:[]
})

const FavModel = model('fav', FavSchema)
module.exports = FavModel