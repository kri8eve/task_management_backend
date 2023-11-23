const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

class Auth{
    static filePath = path.join(__dirname,'../data/users.json')

    static getUserByToken(token){
        let data = fs.readFileSync(Auth.filePath,'utf-8')
        let parsedData = JSON.parse(data)
        const foundData = parsedData.filter(p=>p.token==token)
        if(foundData.length==0){
            return null
        }
        return foundData[0]
    }
    static login(username,password){
        let data = fs.readFileSync(Auth.filePath,'utf-8')
        let parsedData = JSON.parse(data)
        const foundData = parsedData.filter(p=>{
            if(p.username==username.trim() && p.password==password.trim()){
                return p
            }
        })
        if(foundData.length==0){
            throw new Error('Invalid credentials')
        }
        let token = uuidv4()
        parsedData = parsedData.map(p=>{
            if(p.username==username && p.password==password){
                return {...p,token}
            }else{
                return p
            }
        })
        fs.writeFileSync(Auth.filePath,JSON.stringify(parsedData),'utf-8')
        return token
    }
    static signup(username,password){
        let data = fs.readFileSync(Auth.filePath,'utf-8')
        let parsedData = JSON.parse(data)
        const foundData = parsedData.filter(p=>{
            if(p.username==username.trim()){
                return p
            }
        })
        if(foundData.length>0){
            throw new Error('Username exists')
        }
        let id = parsedData.length+1
        let token = uuidv4()
        parsedData = [...parsedData,{id,username,password,token}]
        fs.writeFileSync(Auth.filePath,JSON.stringify(parsedData),'utf-8')
        return token
    }
    static logout(token){
        let data = fs.readFileSync(Auth.filePath,'utf-8')
        let parsedData = JSON.parse(data)
        const foundData = parsedData.filter(p=>{
            if(p.token==token){
                return p
            }
        })
        if(foundData.length==0){
            throw new Error('Token not found')
        }
        parsedData = parsedData.map(p=>{
            if(p.token==token){
                return {...p,token:null}
            }else{
                return p
            }
        })
        fs.writeFileSync(Auth.filePath,JSON.stringify(parsedData),'utf-8')
    }
}

module.exports = Auth