const express = require('express')
const morgan = require ('morgan')
const userRouter = require('./routes/userRoutes')
const otherRouter = require('./routes/anyResourceRoutes')
const taskRouter = require('./routes/taskRoutes')
const globalErrorHandler = require('./controllers/errorControllers')
const dotenv = require("dotenv")
const app = express()
const cors = require("cors")
dotenv.config({path: "./config.env"})

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/otherResourse', otherRouter)


app.use(globalErrorHandler)



module.exports = app