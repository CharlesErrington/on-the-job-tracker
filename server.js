//here we are requiring all of the packages that we need
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
//a function that lets us connect to the database
const connectDB = require('./config/database')
//setting up our routes, telling our server to direct traffic to the appropriate router which is going to send it to the appropriate controller
const mainRoutes = require('./routes/main')
const jobRoutes = require('./routes/jobs')
const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');
//this is middleware to allow cross-origin HTTP requests 
const cors = require('cors')





//setting the location of things
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

//starting the connection to the db by calling the function
connectDB()

//setting a bunch of middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
app.use(cors());

// Session information, store that session information in the database
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      //call sessions using our database connction string
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//flashes error messages
app.use(flash())
  
//our routes
//anything other than jobs goes through main routes
app.use('/', mainRoutes)
app.use('/jobs', jobRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    