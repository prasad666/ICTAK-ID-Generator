const multer  = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Student = require('../models/studentModel');


//signup student
exports.signUp = async (req,res,next) =>{
    try {
        //encrypt password
        req.body.password = await bcrypt.hash(req.body.password, 12);

        //create and add student to DB
        const user = await Student.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
        });
        
        //sign jwt
        const token = jwt.sign(
            {id: user._id, role: user.role},
            'somesecretkey', //process.env.JWT_SECRET,
            {expiresIn: '5d'}
        );
    
        //prevent password sending back 
        user.password = undefined;
    
        //send response with token
        res.status(201).json({
            status: 'success',
            token:token,
            user
        })
    
    } catch (error) {
        next(error)
    }
}

//Signin student
exports.signIn = async (req,res,next) =>{
    try {
        
        //find user
        const user = await Student.findOne({email:req.body.email});
        if(!user) throw new Error('No user found');
        
        //verify user
        const isAuthentic = await bcrypt.compare(req.body.password, user.password);
        
        //error if not authentic
        if(!isAuthentic){
            throw new Error('Incorrect username or password');
        }

        //create token
        const token = jwt.sign(
            {id:user._id, role:user.role}, 
            'somesecretkey', //process.env.JWT_SECRET, 
            {expiresIn:'5d'}
        )

        //prevent password sending back
        user.password = undefined;

        //send response with token
        res.status(200).json({
            status:'success',
            token,
            user
        })
    } catch (error) {
        next(error)
    }
}


//application for id
exports.applyForId = async (req,res,next) => {
    req.body.photo = req.file.filename;
    req.body.idStatus = 'applied';
    const user = await Student.findByIdAndUpdate(req.user.id, req.body,{new:true})
    console.log(user);
    
    res.json({test:'OK'})    /////TO DO
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


