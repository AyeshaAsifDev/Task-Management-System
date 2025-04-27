const mongoose = require("mongoose");

const conn = async() => {
    try{
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("CONNECTED To DATABASE");
    }catch (error){
        // console.log(err);
        console.log("Not CONNECTED");
    }
};

conn();