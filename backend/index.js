import bodyParser from "body-parser";
import express from 'express';
import dotenv from 'dotenv';
import {User,Task} from "./databasess.js";
import passport from "./passport.js";
import cors from 'cors';
import crypto from "crypto";
import jwt from 'jsonwebtoken';
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();
const app=express();
const PORT= process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

const all=['http://localhost:5173',process.env.FONT_END];
app.use(cors({
    origin:all,
    methods:['GET,POST,DELETE'],
    credentials:true
}));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // Use your MongoDB connection
        ttl: 14 * 24 * 60 * 60, // Sessions expire in 14 days
      }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

function hashing_password (password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashed_password = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'); 
    return {hashed_password,salt}; 
}

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized, token missing' });
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
    });
};


app.post('/register',async(req,res)=>{
    try{
    console.log(req.body);
    const {username,email,password}=req.body;
    console.log(username,password)
    const exists=await User.findOne({email});
    console.log("qejfne",exists);
    if(exists){
        return res.status(400).json({message:"User already exists in the system login please"});
    }
    console.log("hey");
    const {hashed_password,salt}=hashing_password(password);
    console.log(hashed_password," ",salt)
    const user_save=User({username:username,password:hashed_password,email:email,salt:salt});
    await user_save.save();
    res.status(400).json({message:"User got registered into the system successfully please login"});
    }
    catch(err){
        res.status(500).json({message:"something went wrong please try again"})
    }
});


app.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
    if (err){
        return res.status(500).json({ message:"Something went wrong please try again to login"});
    }
    console.log("ya to chala");
    console.log(user);
    if (!user){ 
        return res.status(401).json({ message: info.message });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY);
    req.session.user = { id: user.id, email: user.email,username:user.username };
    res.json({token:token, message: 'Login successful!' });
    })(req, res, next);
  });

app.post('/add-task',authenticateToken,async(req,res)=>{
    try{
    const {title,body}=req.body;
    const task_to_save=Task({title:title,body:body,email:req.user.email});
    await task_to_save.save();
    res.status(200).json({message:"ok"});
    }
    catch(err){
        res.status(500).json({message:"some error occured try again"});
    }
})


app.delete('/delete-task', async (req, res) => {
    try {
      const { id } = req.params;
      const response=await Task.deleteOne({ id: id });
      console.log(response);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Some error occurred, try again" });
    }
  });
  

app.get('/tasks',authenticateToken,async(req, res) => {
    try {
        const tasks = await Task.find({email:req.user.email});
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


app.listen(PORT,(req,res)=>{
    console.log("server is running at port 5000");
})
