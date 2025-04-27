import React,{useEffect,useState} from "react";
import Footer from "./nav_footer/Footer";
import Card from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function Dashboard(){
    const navigate = useNavigate();
    let [tasks,updatetasks]=useState([]);
    let [reload,updatereload]=useState(1);
    const apiURL=import.meta.env.VITE_API_URL;
    const Fetchdata = async () => {
        const token = localStorage.getItem('token'); 
        console.log(token);
        if (!token) {
            console.error("User not authenticated!");
            return;
        }

        try {
            const response = await axios.get(`${apiURL}/tasks`, {
                headers: {
                    'authorization': `Bearer ${token}` 
                }
            });
            console.log("Data received:", response.data);
            updatetasks(response.data);
            return response.data.data; 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(()=>{
        Fetchdata();
    },[reload])  
    const logout=async()=>{
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    const render=()=>{
        navigate('/task');
    }


    return (
        <>
        <nav className="flex justify-between m-2">
            <img src="account.png" alt="" className="w-10 h-10 rounded-full border border-black-300"/>
            <button className="bg-red-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-400 transition duration-300" onClick={logout}>Logout</button>
        </nav>
        <div className="bg-[url(https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/wac.92a80da2.svg)]">
        <button className="border rounded-lg text-2xl px-3 py-2 ml-20 mt-10 bg-blue-500 text-white hover:bg-blue-400 transition duration-200" onClick={render}>+Add Task</button>
        <div>
            {tasks.length==0?(
                <div className="w-[100vw] flex justify-center items-center h-[100vh] text-center">
                    <div className="border px-20 py-10">
                    <h1 className="text-2xl">You don't have any task to perform right now</h1>
                    <p>Let's start with adding task</p>
                    </div>
                </div>
            ):(
                <>
                <div className="flex flex-wrap gap-20 w-[100vw] justify-center mt-5 pb-10 flex-grow">
                    {tasks.map((note)=>{
                        console.log(note);
                        return <Card props={note} key={note._id} updatereload={updatereload}></Card>
                    })}
                </div>
                </>
            )}
        </div>
        </div>
        <Footer></Footer>
        </>
    )
}

export default Dashboard;