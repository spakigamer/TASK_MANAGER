import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
 .then(()=>{console.log("MongoDB connection established ")})
 .catch(()=>{console.log("connection failed")})


const usersch=mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    email:{type:String,require:true},
    salt:{type:String,require:true}
})

const tasksch=mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    email:{type:String,require:true}
})

const User=mongoose.model("user",usersch);
const Task=mongoose.model("task",tasksch);

export { User, Task };
