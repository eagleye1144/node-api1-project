// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', async (req, res) =>{
   
   try {
       const users = await User.find(req.params)
       res.json(users)
       
   } catch (error) {
       res.status(500).json({
           message: "The users information could not be retrieved",
           error: error.message,
       })
   }
})

server.get('/api/users/:id', async (req, res) =>{
    try {
        const specificUser = await User.findById(req.params.id)
        if (!specificUser) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else{
            res.json(specificUser)
        }
    } catch (error) {
        res.status(500).json({
            message: "The user information could not be retrieved",
            error: error.message,
        })
    }
})
server.post('/api/users', async (req, res) =>{
    try {
        
        const newUser = await User.insert(req.body)
        if(!newUser.name || !newUser.bio) {
            res.status(400).json({
                message:"Please provide name and bio for the user"
            })
        } else{
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error while saving the user to the database",
            error: error.message,
        })
    }
    
})
server.put('/api/users/:id', async (req, res) =>{
    const { id } = req.params
    const { body } = req
    try {
        const possibleUser = await User.findById(id, body)
        if(!possibleUser){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }   else { 
                if (!req.body.name || !req.body.bio){
                 res.status(400).json({
                message:"Please provide name and bio for the user"
        })
    }
        else {
            const changedUser = await User.update(id, body)
            res.status(200).json(changedUser)
        }
    }
    } catch (error) {
        res.status(500).json({
            message: "The user information could not be modified",
            error: error.message,
        })
    }
})
server.delete('/api/users/:id', async (req, res)=>{
    const {id} = req.params
    const {body} = req
    const possibleUser = await User.findById(id, body)
    if(!possibleUser){
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    }else {
        const deletedUser = await User.remove(id)
        res.status(200).json(deletedUser)
    }
})
module.exports = server // EXPORT YOUR SERVER instead of {}
