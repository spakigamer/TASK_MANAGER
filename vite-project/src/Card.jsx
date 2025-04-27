import React from "react";
import axios from "axios";

function Card({props,updatereload}){
    const apiURL=import.meta.env.VITE_API_URL;
    const del=async()=>{
        const id=props._id;
        console.log(id);
        const response=await axios.delete(`${apiURL}/delete-task`,{id:id});
        console.log(response)
        updatereload(id);
    }
    return(
        <div className="w-xl h-[15rem] border bg-white text-center items-center justify-center flex flex-col gap-2 rounded-2xl hover:shadow-xl/30">
                    <h1 className="text-3xl font-bold">{props.title}</h1>
                    <p>{props.body}</p>
                    <button onClick={del} className="border px-5 py-2 rounded-md cursor-pointer">Delete</button>
        </div>
    )
}

export default Card;