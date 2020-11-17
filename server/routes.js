const express = require('express');
const router = express.Router();
const ctrlUsers =require('../server/controllers/users')
const ctrlTasks =require('../server/controllers/tasks')

const autherize=require('./middleware/autherize')
const Role=require('./helpers/roles')


router.post('/register', ctrlUsers.register);
router.post('/authenticate', ctrlUsers.authenticate);

router.post('/task',autherize(),ctrlTasks.createTask)
router.get('/user/task',autherize(),ctrlTasks.getTasks)
router.put('/task/:id',autherize(),ctrlTasks.updateTask)
router.delete('/task/:id',autherize(),ctrlTasks.deleteTask)
module.exports=router;