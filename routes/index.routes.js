const router = require("express").Router();
const req = require("express/lib/request");
const res = require("express/lib/response");
const User = require("../models/User.model")
//hacer CRUD
/* GET home page */
router.get("/", (req, res, next) => {
  //CON FIND NOS TRAEMOS TODOS LOS DOCUMENTOS DEL MODELO
 
  User.find()
  .then(users =>{
    console.log("que es",users)
    //la respuesta si contiene uno o mas regresara un array
    res.render("index", { users })
  })
  .catch(error=>{
    console.log("el error en el '/' ",error)
    next()
  })
});

//CREATE NECESITA DOS VERBOS DIFERENTES GET Y POST

router.get("/create",(req,res,next)=>{
  res.render("form-user")
})
router.post("/create",(req,res,next)=>{
  //toda la info esta almacenada en req.body
  const {role, ...restUser } = req.body
  //MODEL.create({...})
  console.log("EL BODY", req.body)
  console.log("el restUser", restUser);

  User.create(restUser)
  .then(user=>{   //responde con un {...}
    console.log(user);
     res.render("success",user)
  })
  .catch(error=>{
    console.log("el error en el create",error);
    next()
  })
})

//EDITAR
//editar la lista con un boton("<a>") para que nos made al formulario
//ruta que se llame ("update/:id")
//formulario para editar
//editar success cuando modifiquemos


router.get('/update/:id',(req,res,next)=>{
  const { id } = req.params
  User.findById(id)
  .then(user=>{
    res.render('update-form',user)
  })
  .catch(error=>{
    console.log("el error en el '/update'",error);
    next()
  })
  
})

router.post("/update/:id",(req,res,next)=>{
  const { id } = req.params
  const {role, ...restUser} = req.body
  User.findByIdAndUpdate(id,restUser,{new:true})
  .then(updateUser=>{
    console.log("el user actualizado",updateUser);
    res.render("success",{ isEdit:true, ...updateUser.toObject()})
  })
  .catch(error=>{
    console.log("el error en el '/update'",error);
    next()
  })
})

//DELETE
router.get("/delete/:id",(req,res,next)=>{
const { id } = req.params
User.findByIdAndDelete(id)
.then(()=>{
  res.render("success",{isDelete:true})
})
.catch(error=>{
  console.log("el error en el '/update'",error);
    next()
})
})



module.exports = router;
