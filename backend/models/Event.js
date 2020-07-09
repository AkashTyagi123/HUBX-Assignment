const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    name:{
        type:String
    },
    date:{
        type:String //fix me to store date in DB
    },
    info:{
        type:String
    },
    source:{
        type:String
    },
    contact:{
        type:String
    },
    category:{
        type:String
    },
    location:{
        type:String
    }



});
const event = mongoose.model('Event',eventSchema);
module.exports = event;