const express = require('express');
const multer = require('./../libs/multer');
const perfilController = require('../controllers/PerfilController');
const route = express.Router();

const jwt = require('jsonwebtoken');

route.post('/findbyid', (req,res)=>{
    perfilController.buscarPerfilId(req,res);
})
route.post('/getphotos/:id', (req,res)=>{
    //console.log(req.params.id);
    perfilController.buscarFotos(req,res);
});


route.get('/:id', verifyToken, (req,res)=>{

    let id = req.params.id;
    let idx = req.userId;
    console.log(id);
    console.log(idx);

    res.send("Hola");
});
route.get('/uploads', (req,res)=>{
    return res.send({msh:'hola'});
})

route.post('/photo/:id', (req,res)=>{
    
    perfilController.buscarFoto(req,res);
    
});

route.post('/newuser',multer.single('image'), verifyToken, (req,res)=>{
    
    perfilController.editarPerfil(req,res);

    
});

route.post('/buscarperfil', verifyToken,(req,res)=>{
    perfilController.buscarPerfil(req,res);

});

route.post('/subir',multer.single('image'),verifyToken, (req,res)=>{
    perfilController.subirFoto(req,res);
});


module.exports = route;

function verifyToken(req,res,next){

    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized')
    }

    const token = req.headers.authorization.split(" ")[1];

    if(token === 'null'){
        return res.status(401).send('null');
    }

    const payload = jwt.verify(token, 'secretkey');
    req.userId = payload._id;
    next();
}
