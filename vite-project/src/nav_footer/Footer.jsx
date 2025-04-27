import React from "react";

function Footer(){
    return  (
        <>
        <div class="w-[100%] flex justify-between mt-10" >
            <img src="logo.png" alt="" class="h-30 pl-20"/>
            <div className="pr-30 flex gap-10 mt-5">
                <div className="text-center">
                    <h2 className="text-xl">📞Contact</h2>
                    <p>dhruvgoel2206@gmail.com</p>
                    <p>+91 123456789</p>
                </div>
                <div className="text-center">
                    <h2 className="text-xl">Quick Link</h2>
                    <p>Get Started</p>
                    <p>Github</p>
                </div>
            </div>
        </div>
        <div className="w-[100vw] flex flex-col items-center justify-center">
            <div class="w-[95vw] border-b"></div>
            <p>© 2025 Task Manager. All rights reserved.</p>
        </div>
        </>
    )
}

export default Footer;