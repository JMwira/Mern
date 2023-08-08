const express =  require ('express')
const dotenv = require('dotenv').config()
const colors  = require('colors')
const connectDB = require('./config/db')
const port = process.env.PORT

connectDB()
const{errorHandler} = require('./middleware/errorMiddleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use(errorHandler)

app.listen(port,()=>console.log(`server started on port ${port}`))