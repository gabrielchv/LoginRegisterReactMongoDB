const express = require('express')
const cookieParser = require("cookie-parser")
const path = require('path')
const bodyParser = require('body-parser')
const url = require('url');
const mongoose = require('mongoose');
const { log } = require('console');

const app = express()
app.use(express.static(path.join(__dirname, 'frontend/dist')))
app.use(bodyParser.json())
app.use(cookieParser());

// function to check username or pass lenght
function checkLenght(text, minLenght, maxLenght){
  if (text.length >= minLenght && text.length <= maxLenght){
    return true
  }
  else{
    return false
  }
}

async function usernameCheck(username){
  return await UserModel.find({username: username}).exec()
}

// connect mongoose
mongoose.connect('mongodb+srv://gazerah:gabriel2004@cluster0.nzlp1.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to DB"))

// set user schema
const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
})
const UserModel = mongoose.model("User", userSchema)

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"))
})
app.post('/api/login', (req, res) => {
  if (checkLenght(req.body.username, 3, 32) && checkLenght(req.body.password, 3, 32)){
    usernameCheck(req.body.username).then((e) => {
      // checar se o usuário já existe
      if (Object.keys(e).length > 0){
        if (e[0].password == req.body.password){
          res.send({
            status: true,
            msg: "Usuário logado"
          })
          console.log("Usuário logado")
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
          id: req.cookies.sessionid,
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

app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port 8000`)
})
