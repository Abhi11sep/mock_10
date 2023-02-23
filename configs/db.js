const mongoose = require('mongoose')
require('dotenv').config

const connection = mongoose.connect('mongodb+srv://abhishek:qwertyuiop@cluster0.cv96yev.mongodb.net/flightsDB?retryWrites=true&w=majority')

module.exports = { connection }