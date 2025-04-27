import React,{useState} from "react";
import Nav from "./nav_footer/Nav";
import Footer from "./nav_footer/Footer";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

function Home(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const apiURL = import.meta.env.VITE_API_URL;
    const [isBtnActive,updtaeBtn]=useState(false);
    const navigate = useNavigate();
    const nav_to=()=>{
        navigate("/register");
    }
    const onSubmit =async(data) =>{
        try{
        updtaeBtn(true);
        const response=await axios.post(`${apiURL}/login`,data,{withCredentials:true});
        console.log(response);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            alert("Loged in successful!");
            navigate('/dashboard');
        }
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            updtaeBtn(false); 
        }

    };
    return (
    <>
    <Nav></Nav>
    <div className="h-[100vh]">
    <div className="bg-blue-500 flex" >
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[50%] pl-3">
      <h1 className="text-white pt-5 pb-10 text-5xl font-bold">Project management made easy</h1>
      <div className="flex flex-col w-[60%] justify-center align-middle">

      <h3 className="pt-5 text-white text-2xl">Email</h3>
      <input type="email" {...register("email", { required: true})} className="border bg-white rounded-xl h-9"/>
      {errors.exampleRequired && <span>Email is required</span>}

      <h3 className="pt-5 text-white text-2xl">Password</h3>
      <input type="password" {...register("password", { required: true})} className="border bg-white rounded-xl h-9"/>
      <button type="submit" disabled={isBtnActive} className="mt-5 border rounded-2xl bg-amber-300 text-2xl">Submit</button>
      <p className="mb-20 text-white ml-44">---<a className="cursor-pointer border-b" onClick={nav_to}>Register</a>---</p>
      </div>
    </form>
    <img src="Screenshot 2025-04-27 231355.png" alt="" className="w-[50%]"/>
    </div>
    <div className="w-[100%] flex flex-col items-center justify-center">
        <h2 className="text-black mt-10 text-2xl mb-5">Read More</h2>
        <img src="icons8-down-arrow-30.png" alt="" className="animate-bounce" />
    </div>
    <div className=" flex flex-col justify-center items-center mt-20">
        <h1 className="text-4xl">Keep a note of all the tasks to be done.</h1>
        <p className="text-xl">organize the task</p>
    </div>
    </div>
    <Footer></Footer>
    </>
)
}

export default Home;