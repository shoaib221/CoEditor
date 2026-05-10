import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './context.css';
import { motion } from "framer-motion";

const NavContext = createContext();

export const useNavContext = () => useContext(NavContext);


export const NavProvider = ({ children }) => {
    const navigate = useNavigate();
    const [navi, selectNavi] = useState("/");
    const location = useLocation();

    const [screen, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    function Navigate(path) {
        
        navigate(path);
        selectNavi('/');
    }


    useEffect(() => {
        //console.log("Location change")
        let path = location.pathname.toLowerCase();
        if(path !== '/') selectNavi('//')
        
        
    }, [location?.pathname])







    return (
        <NavContext.Provider value={{ navi, screen, Navigate }} >
            {children}
        </NavContext.Provider>
    )
}
