if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')

//inicializacion
const app = express()
require('./database')

//config
app.set('port', process.env.PORT || 4000)

//ayuda
app.use(morgan('dev'))
const storage = multer.diskStorage({
    destination: path.join (__dirname, 'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalName))
    }
})
app.use(multer({storage}).single('image'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//rutas
app.use('/api/books',require('./routes/ejemplo.js'))

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

//servidor en linea
app.listen(app.get('port'),()=>{
    console.log('server en puerto ', app.get('port'))
})