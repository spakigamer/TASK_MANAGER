import React from "react";
import "./Nav.css";

function Nav(){
    return (
        <>
        <nav class="flex justify-between bg-[#f8f9fa] sticky top-0">
            <div className="pl-50 flex gap-5">
                <img src="logo.png" alt="" class="w-18"/>
                <h1 id="name" class="text-3xl font-semibold  pt-8">Task Manager</h1>
            </div>
            <div></div>
        </nav>
        </>
    )
}

export default Nav;