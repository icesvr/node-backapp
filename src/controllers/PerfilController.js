const multer = require('../libs/multer');

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Photo = require('../models/Photo');


const editarPerfil = async (req,res) => {
    console.log("Servicio editar perfil");
    console.log("Editar perfil");
    const { nickname, description } = req.body;
    
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, 'secretkey');
    const userFind = await User.findById({_id:payload._id});
    const newProfile = new User(userFind);
    
    console.log("payload: ",payload._id);
    newProfile.profile.imgpath = req.file.path;
    newProfile.profile.nickname = nickname;
    newProfile.profile.description = description;

    await newProfile.save();

    return res.json({ msg: 'Foto subida con exito'})
}

const buscarPerfilId = async (req,res)=>{
    let id = req.body.id;
    
    const user = await User.findById({_id:id});
    
    return res.json(user);

}


const buscarPerfil = async (req,res) => { 
    console.log("Servicio buscar perfil");   
    const payload = jwt.verify(req.body.token, 'secretkey');
    const userFind = await User.findById({_id:payload._id});
    return res.json(userFind)
}

const subirFoto = async(req,res)=>{
    console.log("Servicio subir foto");
    const {description} = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, 'secretkey');
    const user = await User.findById({_id:payload._id})
    const newPhoto = new Photo({path:req.file.path,description,createAt:Date.now(), likes:0,user});
    await newPhoto.save();
    
    user.profile.photos.push(newPhoto);
    
    await user.save();
    return res.json(user.profile.photos[0]);
    
}

const buscarFotos = async (req,res)=>{
    console.log("Servicio buscar fotos");
    const id = req.params.id
    
    //const user = await User.findById({_id:id});
    const photos = await Photo.find({user : id});
    return res.json(photos);

}

const buscarFoto = async (req,res)=>{
    console.log("Servicio buscar una foto");
    const id = req.params.id;

    const photo = await Photo.findById({_id:id});
    return res.json(photo);
}


module.exports = {editarPerfil, buscarPerfil,subirFoto,buscarPerfilId, buscarFotos,buscarFoto};