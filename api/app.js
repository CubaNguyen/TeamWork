const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const userRoute = require('./routes/user')
const corsConfig = require('./middlewares/corsConfig');


const app = express()
dotenv.config()

// MIDDLEWARE
app.use(corsConfig);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'))


// ROUTE
app.use("/api/users", userRoute)



app.listen(3030, () => {
  console.log('backend server is running')
})