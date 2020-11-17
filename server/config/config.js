require('dotenv/config') ;

const envVars =process.env;

module.exports= {
  port: envVars.PORT,
  env: envVars.NODE_ENV,
  
  mongoose: {
    url: envVars.NODE_ENV =envVars.MONGODB_URI,
    isDebug: envVars.MONGOOSE_DEBUG,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwtSecret : envVars.JWT_SECRET,

};
