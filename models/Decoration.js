const mongoose = require('mongoose');

const decorationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    isAvailable:{
        type:Boolean,
        required:true,
        default:true
    }
});

module.exports = mongoose.model('Decoration', decorationSchema);