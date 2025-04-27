import React,{useState} from "react";
import Footer from "./nav_footer/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Task(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ButtonDisabled, updateButtonDisabled] = useState(false);
    const apiURL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const logout=async()=>{
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    const onSubmit=async(data)=>{
        updateButtonDisabled(true);
        const token = localStorage.getItem('token');
            console.log(token);
            if (!token) {
                console.error("User not authenticated!");
                return;
            }
            try {
                const response = await axios.post(`${apiURL}/add-task`,data,{
                    headers: {
                        'authorization': `Bearer ${token}`  
                    }
                });
                console.log("Data received:", response.data);
                updateButtonDisabled(false);
                navigate('/dashboard');
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

    return(
     <>
     <nav className="flex justify-between m-2">
            <img src="account.png" alt="" className="w-10 h-10 rounded-full border border-black-300"/>
            <button className="bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-400 transition duration-300" onClick={logout}>Logout</button>
    </nav>
    <div className="w-[100vw] flex flex-col items-center justify-center flex-grow bg-[url(https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/wac.92a80da2.svg)]">
     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col border shadow-2xl w-[30vw] items-center pb-10 z-10 mb-5 mt-10 bg-white rounded-2xl">
                    <h1 className="text-4xl mt-10 font-bold">ADD TASK</h1>
                    <h2 className="mt-15 text-2xl">Title</h2>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="border-b w-[80%] h-8 focus:border-[#4DE4EC] transition duration-300 focus:ring-2 focus:ring-[#4DE4EC] rounded-md"
                    />
                    {errors.title && <span>title is required</span>}
                    <h2 className="mt-15 text-2xl">Description</h2>
                    <input
                        type="text"
                        {...register("body", { required: true })}
                        className="border-b w-[80%] h-8"
                    />
                    {errors.body && <span>body is required</span>}
                    <button
                        id="Sub"
                        type="submit"
                        className="mt-5 border w-[20%] rounded bg-blue-600 text-white text-1xl"
                        disabled={ButtonDisabled} 
                    >
                        Submit
                    </button>
                </form>
    </div>
    <Footer></Footer>
     </>   
    )
}

export default Task;