const Job = require('../models/Job')
// const  calcRoute = require('../public/js/main.js').calcRoute;
const StartTime = require('../models/StartTime')
const StartLocation = require('../models/StartLocation')

module.exports = {
    getJobs: async (req,res)=>{
        console.log(req.user)
        try{
            const jobItems = await Job.find({company:req.user.company})
            const itemsLeft = await Job.countDocuments({userId:req.user.id,completed: false})
            let date = new Date()
            let dateString = date.toISOString().slice(0, 10)
            console.log(req.user.id)
            console.log(dateString)
            const startTime = await StartTime.findOne({workerId: req.user.id, date: dateString})
            console.log('starttime:' + startTime)
            const startLocation = await StartLocation.findOne({workerId: req.user.id, date: dateString})
            res.render('jobs.ejs', {jobs: jobItems, user: req.user, startTime: startTime, startLocation: startLocation})

        }catch(err){
            console.log(err)
        }
    },
    createJob: async (req, res)=>{
        try{
            console.log(req)
            await Job.create({postCode: req.body.postCode, completed: false, customerId: req.body.customerId, workerId: req.user.id, company: req.user.company, estimatedJobLengthHours: req.body.hours, estimatedJobLengthMinutes: req.body.minutes})
            console.log('job has been added!')
            res.redirect('/jobs')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteJob: async (req, res)=>{
        console.log(req.body.jobIdFromJSFile)
        try{
            await Job.findOneAndDelete({_id:req.body.jobIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    deleteStartTime: async (req, res)=>{
        console.log('req.body.startTimeIdFromJSFile', req.body.startTimeIdFromJSFile)
        try{
            await StartTime.findOneAndDelete({_id:req.body.startTimeIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    deleteStartLocation: async (req, res)=>{
        console.log('req.body.startLocationIdFromJSFile', req.body.startLocationIdFromJSFile)
        try{
            await StartLocation.findOneAndDelete({_id:req.body.startLocationIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    addStartTime: async (req, res)=>{
        try{
            console.log(req)
            let startTimeFormatted = `${req.body.startHour}:${req.body.startMinute}`;
            console.log('startTimeFormatted: ' + startTimeFormatted )
            const date = new Date();
            let dateString = date.toISOString().slice(0, 10)
            console.log('date: ' + date)
            await StartTime.create({startTime: startTimeFormatted, workerId: req.user.id, company: req.user.company, date: dateString})
            console.log('job has been added!')
            res.redirect('/jobs')
        }catch(err){
            console.log(err)
        }     
    },
    addStartLocation: async (req, res)=>{
        try{
            console.log(req)
            let startLocation = `${req.body.startLocation}`;
            const date = new Date();
            let dateString = date.toISOString().slice(0, 10)
            console.log('date: ' + date)
            await StartLocation.create({startLocation: startLocation, workerId: req.user.id, company: req.user.company, date: dateString})
            console.log('job has been added!')
            res.redirect('/jobs')
        }catch(err){
            console.log(err)
        }     
    }
}    