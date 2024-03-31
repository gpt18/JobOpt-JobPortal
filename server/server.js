require('dotenv').config();

const express = require('express')
const cors = require('cors');

const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors());


// Database Connection
require('./config/database')
    .connectToMongoDB(process.env.DATABASE_URL)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log("DB Error >>> ", err));



// Router
const authROuter = require('./routes/v1/auth')
const registerRouter = require('./routes/v1/register')
const companyRouter = require('./routes/v1/company')
const studentRouter = require('./routes/v1/student')

app.use('/api/v1/auth', authROuter)
app.use('/api/v1/register', registerRouter)
app.use('/api/v1/company', companyRouter)
app.use('/api/v1/student', studentRouter)





// Server
app.listen(PORT, () => {
    console.log(`Server running... http://localhost:${PORT}`)
});