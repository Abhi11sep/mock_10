const express = require('express')
const app = express();
const { connection } = require('./configs/db')
const { userRouter } = require('./routes/userRoutes.js')

app.use("/api", userRouter)

app.listen(8080, async (req, res) => {
    try {
        await connection
        console.log('connected to db')
    } catch (error) {
        console.log('error in connecting to db')
    }
    console.log('running on port 8080')
})