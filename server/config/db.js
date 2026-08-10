const mongoose = require("mongoose");
const connectDB = async ()=> {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/omsaitextflow");
        console.log("MongoDB Connected Succesfully");

    }catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
module.exports = connectDB;