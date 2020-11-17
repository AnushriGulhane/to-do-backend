const jwt =require('express-jwt');
const config =require('../config/config') ;

const User =require('../models/user.model');

module.exports=autherize;

function autherize(roles=[]){
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
       jwt({secret:config.jwtSecret, algorithms: ['HS256'] }),
        
        // authorize based on user role
        async (req, res, next) => {

            const user = await User.findById(req.user.id);
        
            if (!user || (roles.length && !roles.includes(user.role))) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            req.user.role = user.role;
            next();
        }
    ];
}