const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', require('./routers/authRouter'));


const DB = process.env.MONGODB_URL
mongoose.connect(DB).then(()=> {
    console.log('DB connect success')
})
.catch((e)=>{
    console.log(e)
})
app.use(express.json());
app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server is running port", process.env.PORT)
})