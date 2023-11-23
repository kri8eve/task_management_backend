const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { getAllTasks, postTask, putTask, deleteTask } = require('./controllers/TaskController')
const { logout, signup, login } = require('./controllers/AuthController')
const Auth = require('./dbservice/auth')
const port = process.env.PORT || 9999
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

function routeProtection(req,res,next){

    try {
        const token = req.cookies['user-token']
        const user = Auth.getUserByToken(token)
        if(!user){
            throw new Error('Access denied')
        }
        next()
    } catch (error) {
        return res.send({
            error:error.message
        })
    }
}

app.post('/api/auth/login',login)
app.post('/api/auth/signup',signup)
app.get('/api/auth/logout',logout)

app.get('/api/task',routeProtection,getAllTasks)
app.post('/api/task',routeProtection,postTask)
app.put('/api/task/:id',routeProtection,putTask)
app.delete('/api/task/:id',routeProtection,deleteTask)

app.use('/',(req,res)=>{
    return res.sendFile(path.join(__dirname,'./public/index.html'))
})

app.listen(port,()=>{
    console.log('Server listening on port',port)
})
