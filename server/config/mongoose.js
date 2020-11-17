const mongoose=require('mongoose');
const config =require('../config/config') ;

const mongoUri = config.mongoose.url;

mongoose.connect(config.mongoose.url,config.mongoose.options);

const db = mongoose.connection;

db.once('open', ()=>{
  console.log(`connected to database: ${mongoUri}`)
});

db.on('error', ()=>{
  throw new Error(`unable to connect to mongo db:${mongoUri}`);

});



