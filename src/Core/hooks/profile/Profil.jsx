import { useState, useEffect } from "react";


export default function ProfileIMG () {
    const [img, setImg] = useState({});

     useEffect(() => {
        const stored = localStorage.getItem("userData");
        if (stored) {
        const parsed = JSON.parse(stored);
        setImg(parsed);
        }
    }, []);
    
    return (
        <img 
            src={img?.image} 
            alt="profil"
            className="rounded-full w-[40px] h-[40px] md:w-[68px] md:h-[68px]"
        />

    );
}
        
