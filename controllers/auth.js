const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const Company = require('../models/Company')

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/todos')
    }
    res.render('login', {
      title: 'Login'
    })
  }
  
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/todos')
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/todos')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
    
    let formattedCompany = req.body.company.toLowerCase().split(' ').map(el => el[0].toUpperCase() + el.slice(1)).join(' ')

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      company: formattedCompany,
      password: req.body.password
    })
  
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, async (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      console.log(`req.body.company ${req.body.company}`)
      
      const existingCompany = await Company.find({ companyName: formattedCompany })
      console.log(`existingCompany ${existingCompany}`)
      if (!existingCompany || existingCompany == '' || existingCompany == null || existingCompany == undefined) {
        console.log(`there is no existing company`)
        req.flash('errors', { msg: 'Company with that name does not exist' })
        console.log('errors', { msg: 'Company with that name does not exist' })
        return res.redirect('../signup')
        }
      
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/companies')
        })
      })
    })
  }

  exports.getCompanySignup = (req, res) => {
    // if (req.user) {
    //   return res.redirect('/todos')
    // }
    res.render('companySignUp', {
      title: 'Create Account'
    })
  }

  exports.postCompanySignup = (req, res, next) => {
    console.log('running postCompanySignup')
  
    let formattedCompany = req.body.companyName.toLowerCase().split(' ').map(el => el[0].toUpperCase() + el.slice(1)).join(' ')
    const company = new Company({
      companyName: formattedCompany,
    })
  
    Company.findOne({$or: [
      {company: formattedCompany},

    ]}, async (err, existingCompany) => {
      if (err) { return next(err) }

      if (existingCompany) {
        req.flash('errors', { msg: 'A company with that name already exists.' })
        return res.redirect('../companySignUp')
      }
      let mongoCompany = await Company.find({ companyName: formattedCompany })
      if (mongoCompany) {
        req.flash('errors', { msg: 'A company with that name already exists.' })
        return res.redirect('../companySignUp')
      }
      company.save((err) => {
        if (err) { return next(err) }
        req.logIn(company, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/companies')
        })
      })
    })
  }