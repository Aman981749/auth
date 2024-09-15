const express = require ('express')
const jwt = require ('jsonwebtoken')
const axios = require('axios');

const app = express()
JWT_SECRET ="hehe12356"

app.use(express.json())

let user =[]

app.get("/", function(req, res) {
    res.sendFile(__dirname +"/public/index.html")
})


function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized"
                })
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}

app.post("/signup",(req,res)=>{
    const username = req.body.username
    const password = req.body.password

    const existinguser = user.find((use)=> use.username === username)
    if(existinguser){
        return res.status(400).json({
            error: "user already exists"
        })
    }

    user.push({username,password})

    res.json({
        username:username,
        password:password
    })

})

app.post("/signin",(req,res)=>{
    const username = req.body.username
    const password = req.body.password
   
    const founduser = user.find( (use)=> use.username === username && use.password == password)
   


    if(founduser ){
        const token = jwt.sign({username :founduser.username},JWT_SECRET)
        res.json({
            token:token
        })
    }else{
        res.status(400).json({
            error: "user not found"
        })
    }

    



    



})

app.get("/me", auth,(req,res)=>{

    const user = req.user;

    res.send({
        username: user.username
    })

})

app.get('/logout',auth,(req,res)=>{
      const user= req.user
      if(user){

      }
})


app.listen(3000,()=>{
    console.log("done")
})



