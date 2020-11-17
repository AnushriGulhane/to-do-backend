const Task =require('../models/task.model');
const User =require('../models/user.model');
module.exports={
    createTask,getTasks,updateTask,deleteTask
}
async function createTask(req,res,next){
try{
    //check task already exists
    if (await Task.findOne({ id: req.user.id, description:req.body.description})) {
        res.status(409).json('task already registered');
    }
    else{
        const task = new Task({
            userId: req.user.id,
            description:req.body.description
    
        })
        await task.save();
        res.status(200).json({ message: 'Task created successfully' });
    }
}
catch(err){
    res.status(200).json(`something went wrong: ${err}`)
}
}

async function getTasks(req,res,next) {
    try{
       let task=await Task.find({userId:req.user.id})
       res.status(200).json(task)

    }catch(err){
        next(err)
    }
}

async function updateTask(req,res,next) {
    try{
        await Task.findByIdAndUpdate(req.params.id,{$set:{description:req.body.description}})
       res.status(200).json('task updated')

    }catch(err){
        next(err)
    }
}

async function deleteTask(req,res,next) {
    try{
        let task=await Task.findOne({_id:req.params.id})
        if(task.userId!=req.user.id && req.user.role !== Role.Admin){
            res.status(403).json('you are not autherize to delete task')
        }
        else{
            await Task.remove()
            res.status(200).json('task deleted')
        }
    }catch(err){
        next(err)
    }
}