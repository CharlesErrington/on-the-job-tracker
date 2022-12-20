const Job = require('../models/Job')
// const  calcRoute = require('../public/js/main.js').calcRoute;
const StartTime = require('../models/StartTime')
const StartLocation = require('../models/StartLocation')
const FinishTime = require('../models/FinishTime')
const ArrivalTimes = require('../models/ArrivalTimes')

module.exports = {
    getJobs: async (req,res)=>{
        console.log(req.user)
        try{
            const jobItems = await Job.find({company:req.user.company}).sort({ order: 1 });
            console.log('these are the job items ', jobItems)
            let date = new Date()
            let dateString = date.toISOString().slice(0, 10)
            console.log(req.user.id)
            console.log(dateString)
            const startTime = await StartTime.findOne({workerId: req.user.id, date: dateString})
            console.log('starttime:' + startTime)
            const finishTime = await FinishTime.findOne({workerId: req.user.id, date: dateString})
            console.log('finishTime: ', finishTime)
            const startLocation = await StartLocation.findOne({workerId: req.user.id, date: dateString})
            
            res.render('jobs.ejs', {jobs: jobItems, user: req.user, startTime: startTime, startLocation: startLocation, finishTime: finishTime})

        }catch(err){
            console.log(err)
        }
    },
    createJob: async (req, res)=>{
        try{
            // console.log(req)
            const postcode = req.body.postCode
                .split(' ')
                .join('')
                .toUpperCase();

            const jobs = await Job.find({company:req.user.company }).sort({ order: -1 });
            console.log('jobs ', jobs)

            const highestOrder = jobs[0] ? jobs[0].order : 0;
            console.log('highestOrder ', highestOrder)

            await Job.create({
                postCode: postcode, 
                completed: false, 
                customerId: req.body.customerId, 
                workerId: req.user.id, 
                company: req.user.company, 
                estimatedJobLengthHours: req.body.hours, 
                estimatedJobLengthMinutes: req.body.minutes, 
                archived: false, 
                order: highestOrder + 1
            });
      
            console.log('job has been added!')
            res.redirect('/jobs')
            } catch(err){
            console.log(err)
            }
    },
    changeJobOrderUp: async (req,res) => {
        try{
            let order1 = req.body
            console.log('order1 ', order1)
            console.log('req.body.clickedJobOrder ', req.body.clickedJobOrder)
            console.log('req.body.jobAboveOrder ', req.body.jobAboveOrder)
            await Job.findOneAndUpdate({_id:req.body.jobAboveId}, {
                order: req.body.clickedJobOrder
            })
            await Job.findOneAndUpdate({_id:req.body.clickedJobId}, {
                order: req.body.jobAboveOrder
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    changeJobOrderDown: async (req,res) => {
        try{
            let order1 = req.body
            console.log('order1 ', order1)
            console.log('req.body.clickedJobOrder ', req.body.clickedJobOrder)
            console.log('req.body.jobAboveOrder ', req.body.jobAboveOrder)
            await Job.findOneAndUpdate({_id:req.body.jobBelowId}, {
                order: req.body.clickedJobOrder
            })
            await Job.findOneAndUpdate({_id:req.body.clickedJobId}, {
                order: req.body.jobBelowOrder
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
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
            let formatedStartMinute = req.body.startMinute
            if (formatedStartMinute < 10) {
                formatedStartMinute = '0' + formatedStartMinute
            }
            let formatedStartHour = req.body.startHour
            if (formatedStartHour < 10) {
                formatedStartHour = '0' + formatedStartHour
            }
            let startTimeFormatted = `${formatedStartHour}:${formatedStartMinute}`;
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
            let startLocation = `${req.body.startLocation.split(' ').join('').toUpperCase()}`;
            const date = new Date();
            let dateString = date.toISOString().slice(0, 10)
            console.log('date: ' + date)
            await StartLocation.create({startLocation: startLocation, workerId: req.user.id, company: req.user.company, date: dateString})
            console.log('job has been added!')
            res.redirect('/jobs')
        }catch(err){
            console.log(err)
        }     
    },
    addFinishTime: async (req, res)=>{
        try{
            console.log(req)
            let formatedFinishMinute = req.body.finishMinute
            if (formatedFinishMinute < 10) {
                formatedFinishMinute = '0' + req.body.finishMinute
            }
            let formatedFinishHour = req.body.finishHour
            if (formatedFinishHour < 10) {
                formatedFinishHour = '0' + req.body.finishHour
            }
            let finishTimeFormatted = `${formatedFinishHour}:${formatedFinishMinute}`;
            console.log('finishTimeFormatted: ' + finishTimeFormatted )
            const date = new Date();
            let dateString = date.toISOString().slice(0, 10)
            console.log('date: ' + date)
            await FinishTime.create({finishTime: finishTimeFormatted, workerId: req.user.id, company: req.user.company, date: dateString})
            console.log('finish time has been added!')
            res.redirect('/jobs')
        }catch(err){
            console.log(err)
        }     
    },
    deleteFinishTime: async (req, res)=>{
        console.log('req.body.finishTimeIdFromJSFile', req.body.finishTimeIdFromJSFile)
        try{
            await FinishTime.findOneAndDelete({_id:req.body.finishTimeIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    addArrivalTimes: async(req,res) => {
        console.log('this is the post request and this is req.body.postcodeArrivalTimes ', req.body.postcodeArrivalTimes)
        try{
            await ArrivalTimes.create({
                postcodeArrivalTimes: req.body.postcodeArrivalTimes, 
                workerId: req.user.id, 
                company: req.user.company, 
            });
            console.log('Arrival times have been added!')
            res.json({ success: true });
        } catch(err){
            console.log(err)
        }
    }
}    