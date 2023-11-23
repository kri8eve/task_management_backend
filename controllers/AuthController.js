const Auth = require("../dbservice/auth")


function login(req,res){
    try {
        const {username,password} = req.body
        const token = Auth.login(username,password)
        return res.send({
            message:'Logged in successfully',token
        })
    } catch (error) {
        return res.send({error:error.message})
    }
}

function signup(req,res){
    try {
        const {username,password} = req.body
        const token = Auth.signup(username,password)
        return res.send({
            message:'Signed up successfully',token
        })
    } catch (error) {
        return res.send({error:error.message})
    }
}


function logout(req,res){
    try {
        Auth.logout(token)
        return res.send({
            message:'Logged out successfully'
        })
    } catch (error) {
        return res.send({error:error.message})
    }
}

module.exports = {login,signup,logout}