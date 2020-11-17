const jwt =require('jsonwebtoken') ;
const bcrypt =require('bcrypt');
const crypto =require('crypto');
const Role =require('../helpers/roles');
const config =require('../config/config');
const User =require('../models/user.model');
module.exports={
    register,authenticate
}
async function register(req,res,next){
    try{
        // validate
        if (await User.findOne({ email: req.body.email })) {
            res.status(409).json('user already registered');
        }
        else{
            // create employee object
        const user = new User(req.body);
        console.log("employee",user)

        // first registered employee is an admin
        const isFirstAccount = (await User.countDocuments({})) === 0;
        user.role = isFirstAccount ? Role.Admin : Role.User;
        

        // hash password
        user.passwordHash = hash(req.body.password);
        console.log("employee",user)
        // save employee
        await user.save();
       res.status(200).json({ message: 'Registration successful' });

        } 
    }
    catch(err){
        res.status(200).json(`something went wrong: ${err}`)
    }
};

async function authenticate(req,res,next) {
    try{
        
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        throw 'Email or password is incorrect';
    }
    else{
        // authentication successful so generate jwt and refresh tokens
        const jwtToken = generateJwtToken(user);
        
        let account={...basicDetails(user),jwtToken}
        res.json(account);
        }
    }
    
    catch(err){
        res.status(200).json(`something went wrong: ${err}`)
    }
};

//hash password
function hash(password) {
    return bcrypt.hashSync(password, 10);
}



function basicDetails(user) {
    const { id, title, firstName, lastName, email, role, created, updated, isVerified } = user;
    return { id, title, firstName, lastName, email, role, created, updated, isVerified };
}

function generateJwtToken(user) {
    // create a jwt token containing the user id that expires in 15 minutes
    return jwt.sign({id: user.id }, config.jwtSecret, { expiresIn: '30m' });
}
