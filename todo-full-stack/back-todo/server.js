const mongoose = require('mongoose')
const server = require('./app')


mongoose.connect('mongodb://localhost:27017/tododb')



const port = 3000 || 3001
server.listen(port,'127.0.0.1', ()=>{
    console.log(`Server is listening on a port ${port}`);
})