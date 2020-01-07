const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const connString = require('./config/config').mongoURI
const posts = require('./routes/api/posts')

const multer = require('multer')

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())


app.use('/static', express.static(__dirname + '/uploads'))
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString().split(':')[0] + file.originalname)
  }
})
const upload = multer({storage:storage})

mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))




app.post('/uploadImage', upload.single('file'), (req, res) => {
    console.log("starting upload...", req.file)
  
    res.json('http://localhost:5000/static/' + req.file.filename)
  });
  

 
app.use('/api/posts', posts)

app.listen(PORT,() => console.log(`App started at port ${PORT}`))