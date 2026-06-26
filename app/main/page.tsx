"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function MainPage() {

    const router = useRouter()
    

    function goBoard(){
        router.push("/board")
    }

    return (
        <>
           <div>
            <button onClick={goBoard} className="w-50 h-50 cursor-pointer bg-white">Play game</button>
           </div>
        </>
    )
}