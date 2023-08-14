const path = require('path')
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
app.use('/api/users', require('./routes/userRoutes'))
//serve frontend
if(process.env.NODE_ENV==='production'){
    express.static(path.join(__dirname,'../frontend/build'));
    app.get('*', (req, res)=>
        res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html'))
    )
} else{
    app.get('/', (req, res)=>{
        res.json("you are still in development environment")
    })
}
app.use(errorHandler)

app.listen(port,()=>console.log(`server started on port ${port}`))