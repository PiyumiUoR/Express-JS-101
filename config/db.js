const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://piyumi:firstprojectinnode@cluster0.wiqvakz.mongodb.net/mynodejsdb?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async() => {
    try {
        await mongoose.connect(DB_URI);
        console.log('DB connected.');
    } catch (error) {
        console.log('Error while connecting' + error.message)
    }
}

module.exports = connectDB;