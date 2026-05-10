import { useState } from "react"
import { Loading } from "./Loading";



export function useConfirmer( title ) {
    const [show, setShow] = useState(false);
    const [procede, setProcede] = useState(false);
    const [message, setMessage] = useState(title)


    function Init() {
        console.log("confirmer init")
        setShow(true);
    }


    async function handler(verdict) {
        console.log("handler");
        if (verdict === "yes") setProcede(true);
        else setProcede(false);
        setShow(false);
    }

    const Tag = () => {


        return (
            <div className={`fixed w-full h-full inset-0 z-40 bg-black/50 justify-center items-center ${show ? "flex" : "hidden"}`}  >
                <div className="bg-(--color1) text-(--color2) w-full max-w-100 py-8 px-4 relative rounded-lg" >

                    <div className="header-11" >{message}</div>
                    <br />


                    <div className="flex gap-4 items-center justify-center" >
                        <div onClick={() => handler("yes")} className="bg-green-800 text-white button-5" >Yes</div>
                        <div onClick={() => handler("no")} className="bg-red-800 text-white button-5" >No</div>
                    </div>
                </div>
            </div>
        )
    }


    return { Tag, Init, procede }

}