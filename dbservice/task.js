const fs = require('fs')
const path = require('path')
class Task{
    static filePath = path.join(__dirname,'../data/tasks.json')
    static find(userId){
        let data = fs.readFileSync(Task.filePath,'utf-8')
        let parsedData = JSON.parse(data)
        return parsedData.filter(p=>p.uid==userId)
    }
    static findById(id){
        let data = fs.readFileSync(Task.filePath,'utf-8')
        let parsedData = JSON.parse(data)
        const foundData =  parsedData.filter(d=>d.id===id)
        if(foundData.length===0){
            throw new Error('Task not found')
        }
        return foundData[0]
    }
    static findByIdAndUpdate(id,updates){
        console.log({id,updates})
        let data = fs.readFileSync(Task.filePath,'utf-8')
        let parsedData = JSON.parse(data)
        parsedData = parsedData.map(p=>{
            if(p.id==id){
                return {...p,...updates}
            }else{
                return p
            }
        })
        fs.writeFileSync(Task.filePath,JSON.stringify(parsedData),'utf-8')
    }
    static insert(uid,item){
        let data = fs.readFileSync(Task.filePath,'utf-8')
        let parsedData = JSON.parse(data)
        let id = parsedData.length+1
        parsedData = [...parsedData,{...item,id,uid}]
        fs.writeFileSync(Task.filePath,JSON.stringify(parsedData),'utf-8')
        return {...item,id}
    }
    static deleteById(id){
        let data = fs.readFileSync(Task.filePath,'utf-8')
        let parsedData = JSON.parse(data)
        parsedData = parsedData.filter(p=>p.id!=id)
        fs.writeFileSync(Task.filePath,JSON.stringify(parsedData),'utf-8')
    }
}

module.exports = Task