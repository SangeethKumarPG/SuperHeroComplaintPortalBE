const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    requesterName : {
        type:String,
        required:true
    },
    complaintType:{
        type:String,
        required:true        
    },
    dangerLevel:{
        type:String,
        required:true
    },
    location:{
        lat:{
            type:Number,
            reqired:true
        },
        lng:{
            type:Number,
            reqired:true
        }
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    createdDate:{
        type:Date,
        default:Date.now
    }
})
const complaints = mongoose.model('complaints',complaintSchema);
module.exports = complaints;