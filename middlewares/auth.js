const jwt = require('jsonwebtoken')

module.exports = (rol) => (req, res, next) => {
  try {
    /* headers -  body - query - params */
     const token = req.header('auth')
  
     if(!token){  
      return res.status(409).json({msg:'Token incorrecto'})
     }
     
     const verify = jwt.verify(token, process.env.JWT_SECRET) 
     
     if(rol === verify.rol){
       return next()
     }else{
      return res.status(401).json({msg:'No tenes acceso'})
     }


  } catch (error) {
    console.log(error)
  }
}
