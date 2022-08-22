const multer  = require('multer');
const User = require('../models/userModel');


//application for id
exports.applyForId = async (req,res,next) => {
    req.body.photo = req.file.filename;
    req.body.idStatus = 'applied';
    const user = await User.findByIdAndUpdate(req.user.id, req.body,{new:true})
    console.log(user);
    
    res.json({test:'OK'})
}

//photo upload with multer
const multerStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'public/img/users')
    },
    filename: (req,file,cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null,req.user.id+'.'+ext)
    }
})

const multerFilter = (req,file,cb)=>{
    if (file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb(new Error('Please upload an image'),false)
    }
}

exports.upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});


