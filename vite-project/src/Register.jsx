import React, { useState } from "react";
import Nav from "./nav_footer/Nav";
import Footer from "./nav_footer/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ButtonDisabled, updateButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const apiURL = import.meta.env.VITE_API_URL;
    const nav_to_login=()=>{
        navigate("/");
    }
    const onSubmit = async (data) => {
        try {
            updtaeButtonDisabled(true);
            console.log(apiURL);
            const response = await axios.post(`${apiURL}/register`, data, {
                withCredentials: true,
            });

            console.log(response.data);
            alert("Registration successful!");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            updateButtonDisabled(false); 
        }
    };

    return (
        <>
            <Nav />
            <div className="w-[100vw] flex flex-col items-center justify-center flex-grow bg-[url(https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/wac.92a80da2.svg)]">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col border shadow-2xl w-[30vw] items-center pb-10 z-10 mb-5 mt-10 bg-white rounded-2xl">
                    <h1 className="text-4xl mt-10 font-bold">Task Manager</h1>
                    <h2 className="mt-15 text-2xl">Name</h2>
                    <input
                        type="text"
                        {...register("username", { required: true })}
                        className="border-b w-[80%] h-8 focus:border-[#4DE4EC] transition duration-300 focus:ring-2 focus:ring-[#4DE4EC] rounded-md"
                    />
                    {errors.username && <span>Name is required</span>}
                    <h2 className="mt-15 text-2xl">Email</h2>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="border-b w-[80%] h-8"
                    />
                    {errors.email && <span>Email is required</span>}
                    <h2 className="mt-15 text-xl">Password</h2>
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="border-b w-[80%] h-8"
                    />
                    {errors.password && <span>This field is required</span>}
                    
                    <button
                        id="Sub"
                        type="submit"
                        className="mt-5 border w-[20%] rounded bg-blue-600 text-white text-1xl"
                        disabled={ButtonDisabled} 
                    >
                        Submit
                    </button>
                </form>
                <p className="mb-10 text-blue-500 cursor-pointer">--<a onClick={nav_to_login}>Login</a>--</p>
            </div>
            <Footer />
        </>
    );
}

export default Register;
