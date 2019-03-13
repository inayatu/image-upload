const express = require('express')
const bodyParser = require('body-parser')
const uploadFile = require('./uploadFile')

const app = express();

app.use(bodyParser.urlencoded({parameterLimit: 100000, limit: '5mb', extended: false}))
app.use(bodyParser.json({limit: '5mb'}))

const PORT = process.env.PORT || 3000;

app.use(express.static('public'))

app.use('/api/upload', uploadFile)

app.listen(PORT, ()=>{
	console.log(`App listening at PORT ${PORT}`)
})    