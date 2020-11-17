const mongoose =require('mongoose') ;

const Schema=mongoose.Schema;

let taskSchema = new Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
    },
    description:{type:String, required:true},
    status:{type:String,default:'created'},
},{timestamps:true});


module.exports= mongoose.model('Task',taskSchema);