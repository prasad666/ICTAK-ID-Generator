const jwt = require('jsonwebtoken');
var httpError = require('http-errors');


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