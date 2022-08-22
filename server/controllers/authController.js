const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//signup user
exports.signUp = async (req,res,next) =>{
    try {
        //encrypt password
        req.body.password = await bcrypt.hash(req.body.password, 12);

        //create and add user to DB
        const user = await User.create({
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

//Signin user
exports.signIn = async (req,res,next) =>{
    try {
        
        //find user
        const user = await User.findOne({email:req.body.email});
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

//Protect routes
exports.protect = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        if(!token){
            throw new Error('Not authorized');
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
        if(!isAuthorized) return next(new Error ('Not authorized'));
        next();
    }
}