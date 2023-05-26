const express = require("express")
const bcrypt = require("bcrypt")
const cors = require("cors")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const {connecton,Ascendmodel,todomodel} = require("./config/db")




const app = express()
app.use(express.json())
app.use(cors())




app.get("/",(req,res)=>{
    console.log("Welcome to Home Page")
   
})






// tododata route
app.post("/tododata",async(req,res)=>{
    const {id} = req.body
  await todomodel.insertMany({id})
})





// todolist route
app.get("/todolist",async(req,res)=>{
const todolist = await todomodel.find()
console.log(todolist)
res.send(todolist)

})





// textdata here
app.post("/textdata",async(req,res)=>{
    const {id,text} = req.body
    const  date = new Date();
    const years = date.getTime();
    const newAward = {
        award: text,
       
      
      };


try {
    const result = await todomodel.updateMany(
      { id: id }, 
      { $push: { awards:newAward } }
    );
    

  } catch (err) {
    console.error('Error updating document', err);
  }
})




// delte 


app.post ("/tododelete",async(req,res)=>{
 
    console.log("dletedfdf")
   
    const {id,_id} = req.body


    try {
  await  todomodel.updateOne(
        { "id":id}, // Specify the document that contains the books array
        { $pull: { "awards": { "_id": _id } } }// Use $pull to remove the book with the specified id
  )
    }

  catch (err) {
    console.error('Error updating document', err);
  }
})








// handledragdrop  here 


app.post("/dro",async(req,res)=>{
    console.log("dro")
    const {id,dropid,dragtext,dragid} =req.body
    console.log(id,dropid,dragtext)
    const newAward = {
        award: dragtext,
       
      
      };

    try {
        await  todomodel.updateOne(
              { "id":dragid}, // Specify the document that contains the books array
              { $pull: { "awards": { "_id":id } } }// Use $pull to remove the book with the specified id
        )

        const result = await todomodel.updateMany(
            { id: dropid }, 
            { $push: { awards:newAward } }
          );
          
          }
      
        catch (err) {
          console.error('Error updating document', err);
        }



})







// login here
app.post("/login",async(req,res)=>{
    const {email,password} =req.body
await Ascendmodel.insertMany(req.body)
try{
    const singleuser = await Ascendmodel.find({email})
    console.log(singleuser,"sdfsfsf")
    const userd = singleuser[0]._id
  
    const token = jwt.sign({ foo: userd }, 'shhhhh');
  
    res.send(token)
}
catch{
  console.log('Something went wrong')
}
})









app.listen(8000,()=>{
    console.log("welcome to Backend")
})