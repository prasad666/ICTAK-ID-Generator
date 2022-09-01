const jwt = require('jsonwebtoken');
var httpError = require('http-errors');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

const User = require('../models/userModel');
const sendMail = require('../utils/email');


//register user
exports.register = async (req,res,next) =>{
    try {
        //encrypt password
        req.body.password = await bcrypt.hash(req.body.password, 12);

        //create and add user to DB
        const user = await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role  //todo////change this///student cannot set any other role
        });
        
        //sign jwt
        const token = jwt.sign(
            {id: user._id, role: user.role},
            'somesecretkey', //process.env.JWT_SECRET,
            {expiresIn: '5d'}
        );
    
        //prevent password sending back 
        user.password = undefined;
        user.encryptedResetToken= undefined;
    
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

//login user
exports.login = async (req,res,next) =>{
    try {
        
        //find user
        const user = await User.findOne({email:req.body.email});
        if(!user) throw httpError(404, 'No user found');
        
        //verify user
        const isAuthentic = await bcrypt.compare(req.body.password, user.password);
        
        //error if not authentic
        if(!isAuthentic){
            throw httpError(401, 'Incorrect username or password');
        }

        //create token
        const token = jwt.sign(
            {id:user._id, role:user.role}, 
            'somesecretkey', //process.env.JWT_SECRET, 
            {expiresIn:'5d'}
        )

        //prevent password sending back
        user.password = undefined;
        user.encryptedResetToken= undefined;

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
        const user = await User.findOne({email: req.body.email}); 
        if(!user){
            throw httpError(404, 'No user found');
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
        const rootUrl = 'localhost:4200'             ////////////change this in production   proc.env  ||||or use   req.get('host')
        const passResetLink = `${req.protocol}://${rootUrl}/pages/reset-password/${resetToken}`
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
        const user= await User.findOne({encryptedResetToken: recievedTokenEncrypted});
        if(!user){throw httpError(404, 'Not found')}
        //check whether expired
        if(user.passwordResetExpiry < Date.now()){
            throw httpError(406, 'Password reset link expired')
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

//Protect routes
exports.protect = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        if(!token){
            throw httpError(401,'Not authorized');
        }
        jwt.verify(token, 'somesecretkey'/*process.env.JWT_SECRET*/, (err,tokenData)=>{
            if(err)  throw err;   
            req.user = tokenData;
            next();
        });
        
    } catch (error) {
        next(error)
    }
}

//to restrict routes to specific user roles
exports.restrictTo = (...roles) =>{
    return (req,res,next) => {
        isAuthorized = roles.includes(req.user.role);
        if(!isAuthorized) return next(httpError (401, 'Not authorized'));
        next();
    }
}