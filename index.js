const express = require('express')
const cookieParser = require("cookie-parser")
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const session = require('express-session')
require("dotenv").config()

const app = express()
app.use(express.static(path.join(__dirname, 'frontend/dist')))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: '3646032321jdjadahsdjkfadaass', // just a long random string
  resave: false,
  saveUninitialized: true
}));

// function to check username or pass lenght
function checkLenght(text, minLenght, maxLenght){
  try{
    if (text.length >= minLenght && text.length <= maxLenght){
      return true
    }
    else{
      return false
    }
  }
  catch (err){
    console.log('err nos dados')
    return false
  }
}

async function usernameCheck(username){
  return await UserModel.find({username: username}).exec()
}

// connect mongoose
mongoose.connect(process.env.API_KEY, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to DB"))

// set user schema
const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  notes: [{title: String, text: String}]
})
const UserModel = mongoose.model("User", userSchema)

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"))
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"))
})

// main
app.post('/api/main', async (req, res) => {
  const foundUser = await UserModel.find({id: req.sessionID})
  if (Object.keys(foundUser).length == 0){
    console.log("Usuário não possui csrftoken");
    res.send({
      logged: false
    })
  }
  else{
    res.send({
      logged: true,
      data: foundUser[0].notes})
  }
}) 

// login
app.post('/api/login', (req, res) => {
  if (checkLenght(req.body.username, 3, 32) && checkLenght(req.body.password, 3, 32)){
    usernameCheck(req.body.username).then((e) => {
      // checar se o usuário já existe
      if (Object.keys(e).length > 0){
        if (e[0].password == req.body.password){
          UserModel.updateMany({ id: req.sessionID },{ id: "" }).then(() => {
            UserModel.findOneAndUpdate({ username: req.body.username },{ id: req.sessionID }).then(() => {
              res.send({
                status: true,
                msg: "Usuário logado"
              })
              console.log(req.sessionID)
              console.log("Usuário logado")
            })
          })
        }
        else{
          res.send({
            status: true,
            msg: "Senha incorreta"
          })
          console.log("Senha incorreta")
        }
      }
      else{
        res.send({
          status: false,
          msg: "Usuário não existente"
        })
        console.log("Usuário não existente")
      }
    })
  }
  // Se dados inválidos
  else{
    res.send({
      status: false,
      msg: "Dados inválidos"
    })
    console.log("Dados inválidos")
  }
})

// registrar usuário
app.post('/api/register', (req, res) => {
  if (checkLenght(req.body.username, 3, 32) && checkLenght(req.body.password, 3, 32)){
    usernameCheck(req.body.username).then((e) => {
      // checar se o usuário já existe
      if (Object.keys(e).length == 0){
        const user = new UserModel({
          id: "",
          username: req.body.username,
          password: req.body.password,
        })
        user.save()
        res.send({
          status: true,
          msg: "Usuário criado"
        })
        console.log("Usuário criado")
      }
      else{
        res.send({
          status: false,
          msg: "Usuário já existente"
        })
        console.log("Usuário já existente")
      }
    })
  }
  // Se dados inválidos
  else{
    res.send({
      status: false,
      msg: "Dados inválidos"
    })
    console.log("Dados inválidos")
  }
})

// Add Note
app.post('/api/addNote', async (req, res) => {
  console.log("Nota adicionada")
  let note = { title: req.body.title, text: req.body.text }
  let user = await UserModel.findOne({ id: req.sessionID }).exec()
  user.notes.push(note)
  user.save()
})

app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port 8000`)
})
