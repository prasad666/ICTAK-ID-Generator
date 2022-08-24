const multer  = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const Student = require('../models/studentModel');
const sendMail = require('../others/email');


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

//password reset
exports.forgotPassword = async (req,res,next) => {
    try {
        //get user
        const user = await Student.findOne({email: req.body.email}); 
        if(!user){
            throw new Error('No user found');
        } 

        //create a random pass reset token and encrypt it
        const resetToken = crypto.randomBytes(32).toString('hex');
        const encryptedResetToken= crypto.createHash('sha256').update(resetToken).digest('hex') 
        const passwordResetExpiry = Date.now()+ 60*60*1000;
        //save encrypted token and expiry time to db
        user.encryptedResetToken = encryptedResetToken;
        user.passwordResetExpiry = passwordResetExpiry;
        await user.save();

        //create url with un-encrypted token & send url to user's mail
        const passResetLink = `${req.protocol}://${req.get('host')}/students/resetPassword/${resetToken}`
        const message = `Password reset link for ICTAK ID Generator (expires in 60 minutes) : <a href = "${passResetLink}">reset password</a>`
        await sendMail({
            mail: req.body.email,
            subject: 'ICTAK password reset link',
            message:message
        })

        res.status(200).json({
            status:'success'
        })
    

    } catch (error) {
        next(error);
    }
}

exports.resetPassword = async (req,res,next) => {
    try {
        //encrypt the recieved token
        const recievedTokenEncrypted= crypto.createHash('sha256').update(req.params.token).digest('hex') 

        //match it with stored one
        const user= await Student.findOne({encryptedResetToken: recievedTokenEncrypted});
        if(!user){throw new Error('No user found')}
        //check whether expired
        if(user.passwordResetExpiry < Date.now()){
            throw new Error('Password reset link expired')
        }
        //update new password
        user.password = await bcrypt.hash(req.body.password, 12);
        user.encryptedResetToken = undefined;
        user.passwordResetExpiry = undefined;
        await user.save();

        //send  response
        res.status(200).json({status:'success'});

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


