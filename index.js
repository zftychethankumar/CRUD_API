const express = require("express")
//setting to access
require('dotenv').config()
const connectDb = require('./db/connect')
const cors = require('cors')

const PORT = process.env.PORT

//instance of express
const app = express()

//body parser middleware
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
//middleware
//cors => cross origin resource sharing
app.use(cors())

//index route
app.get(`/`,(req,res) => {
    res.status(200).json({ status: true, msg: "Welcome to CRUD API"})
})

//connecting router => app.use(path,router)
app.use(`/api/user`,require('./route/userRoute'))

//default route
app.all(`**`, (req,res) => {
    res.status(404).json({ status: true, msg: `requested path not found`})
})

//server listen
app.listen(PORT, () => {
    if(process.env.MODE === "development") {
        // to connect local database
        connectDb(process.env.MONGO_DEV)
    
    } else if(process.env.MODE === "production") {
        // to connect cloud database
        connectDb(process.env.MONGO_URL)
        
    }
    console.log(`server is running @ http://localhost:${PORT}`)
})