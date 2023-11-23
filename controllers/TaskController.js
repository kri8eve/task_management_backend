const Auth = require("../dbservice/auth")
const Task = require("../dbservice/task")


function getAllTasks(req,res){
    try {
        const token = req.cookies['user-token']
        const user = Auth.getUserByToken(token)
        if(!user){
            throw new Error('Access denied')
        }
        const tasks = Task.find(user.id)
        return res.send(tasks)
    } catch (error) {
        return res.send({error:error.message})
    }
}

function postTask(req,res){
    try {
        const {text} = req.body
        let newTask = {text,isCompleted:false}
        const token = req.cookies['user-token']
        const user = Auth.getUserByToken(token)
        if(!user){
            throw new Error('Access denied')
        }
        const task = Task.insert(user.id,newTask)
        return res.send({
            message:'Task submitted successfully',
            task
        })
    } catch (error) {
        return res.send({error:error.message})
    }
}


function putTask(req,res){
    try {
        const taskId = req.params.id
        console.log(req.body)
        Task.findByIdAndUpdate(taskId,req.body)
        return res.send({
            message:'Task updated successfully'
        })
    } catch (error) {
        return res.send({error:error.message})
    }
}
function deleteTask(req,res){
    try {
        const taskId = req.params.id
        Task.deleteById(taskId)
        return res.send({
            message:'Task deleted successfully'
        })
    } catch (error) {
        return res.send({error:error.message})
    }
}
module.exports = {getAllTasks,postTask,putTask,deleteTask}