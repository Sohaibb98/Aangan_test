const express = require('express');
const app = express()
//const PORT = 3000
const mongoose  = require('mongoose')
const {PORT, mongoUri} = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const bucketListItemRoutes = require('./routes/api/bucketListItems')
const userRoutes = require('./routes/api/users')
const studentRoutes = require('./routes/api/students')
const courseRoutes = require('./routes/api/courses')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())


console.log('mongo uri: ')
console.log(mongoUri)
mongoose.connect(
    "mongodb+srv://aangan:sohaib@cluster0.ozit9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
).then(() => console.log('Mongodb connected....'))
.catch((err) => console.log(err))

app.use('/api/bucketListItems', bucketListItemRoutes)
app.use('/api/users', userRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/courses', courseRoutes)
app.get('/',(req, res) => res.send('Hello World'))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))