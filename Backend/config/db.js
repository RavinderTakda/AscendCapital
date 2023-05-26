
const mongoose = require("mongoose")
require('dotenv').config()
const connecton = mongoose.connect("mongodb+srv://RavinderTakda:RaviTakda8306@cluster0.7zsjhui.mongodb.net/")


const LoginSchma = mongoose.Schema({

email:{type:String,required:true},
password:{type:String,required:true}

})


const Ascendmodel = mongoose.model("ascendlogindata",LoginSchma)




const todoSchma = mongoose.Schema({
    listNo:{type:String},
    awards: [{
        award: String,
        year: Number,
        by: String
      }],
    id:{type:Number}
})


const todomodel =mongoose.model("todoinfo",todoSchma)




module.exports = {
    connecton,
    Ascendmodel,
    todomodel
}