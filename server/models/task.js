const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const taskSchema = new Schema({
    tittle:{
        type:String,
        required : true,
    },
    description:{
        type:String,
        required : true,
    },
    priority:{
        type:String,
        required : true,
        enum:["low", "medium", "high"],
        default:"low",
    },
    status:{
        type:String,
        required : true,
        enum:["yetToStart", "inProgress", "Complated"],
        default:"yetToStart",
    },
});

module.exports = mongoose.model("Task", taskSchema);
