# Introduction

An app built using the MVC Architecture, has authorization implemented, built with EJS, CSS, JavaScript, Node.js, Express.

It is built for trade workers, they can input the location of their job by it's postcode, and the length of time the expect to work on the job that day.

Using Google's API the app will then calculate the route to each job, it will use the time to travel to each job and the time estimate for the work done on each job site to estimate the arrival time to each location as well as the time the will arrive home after a days work.

This makes it easier for companies to calculate how many jobs they can fit in a day as well as giving their clients more accurate estimates of arrival times.

---

# Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator


# on-the-job-tracker

----

# Improvements

Use real time tracking of the workers location to constantly update the estimated arrival time for the clients
