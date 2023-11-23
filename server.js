const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
let tasks = require('./data/tasks.json')
const port = process.env.PORT || 9999
const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())




app.get('/api/task',(req,res)=>{
    try {
        return res.send(tasks)
    } catch (error) {
        return res.send({error:error.message})
    }
})
app.post('/api/task',(req,res)=>{
    try {
        const {text} = req.body
        let id = tasks.length+1
        let newTask = {id,text,isCompleted:false}
        tasks.push(newTask)
        return res.send({
            message:'Task submitted successfully',
            task:newTask
        })
    } catch (error) {
        return res.send({error:error.message})
    }
})
app.put('/api/task/:id',(req,res)=>{
    try {
        const taskId = req.params.id

        let newTasks = tasks.map(task=>{
            if(task.id == taskId){
                return {...task,...req.body}
            }
        })
        tasks = newTasks
        return res.send({
            message:'Task updated successfully'
        })
    } catch (error) {
        return res.send({error:error.message})
    }
})
app.delete('/api/task/:id',(req,res)=>{
    try {
        const taskId = req.params.id
        tasks = tasks.filter(task=>task.id!=taskId)
        return res.send({
            message:'Task deleted successfully'
        })
    } catch (error) {
        return res.send({error:error.message})
    }
})

app.use('/',(req,res)=>{
    return res.sendFile(path.join(__dirname,'./public/index.html'))
})

app.listen(port,()=>{
    console.log('Server listening on port',port)
})
