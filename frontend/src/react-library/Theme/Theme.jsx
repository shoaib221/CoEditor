import React, { useEffect, useState } from 'react';
import './Theme.css'
import { Sun, Moon } from "lucide-react";

const ThemeContext = React.createContext();
export const useThemeContext = () => React.useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [themeName, setTheme] = useState("light");

    useEffect(() => {
        let theme = localStorage.getItem("color-theme");
        if (!theme) return;

        setTheme(theme.toString());

        document.documentElement.setAttribute('color-theme', theme.toString());


    }, [])


    function toggleTheme() {


        if (themeName === "light") {
            document.documentElement.setAttribute('color-theme', 'dark');
            localStorage.setItem("color-theme", "dark");
            setTheme("dark");
        }
        else {
            document.documentElement.setAttribute('color-theme', 'light');
            localStorage.setItem("color-theme", "light")
            setTheme("light");
        }
    }



    function SetTheme(val) {
        document.documentElement.setAttribute('color-theme', val);
        localStorage.setItem("color-theme", val);
        setTheme(val);
    }

    const ThemeButton2 = () => {

        return (
            <button onClick={toggleTheme}   >
                Toggle Theme
            </button>
        )
    }


    const ThemeChoice = () => {
        return (
            <div className='w-100 flex flex-row gap-2' >
                <button onClick={() => SetTheme('dark')} className='p-2 bg-(--color1) text-(--color2)' >Dark</button>
                <button onClick={() => SetTheme('sea')} className='p-2 bg-(--color1) text-(--color2)' >Sea</button>
                <button onClick={() => SetTheme('sky')} className='p-2 bg-(--color1) text-(--color2)' >Sky</button>
                <button onClick={() => SetTheme('light')} className='p-2 bg-(--color1) text-(--color2)' >Light</button>
            </div>
        )
    }



    const info = { themeName, ThemeButton2, toggleTheme, SetTheme, ThemeChoice }

    return (
        <ThemeContext.Provider value={info} >
            {children}
        </ThemeContext.Provider>
    )
};


export const ThemeButton3 = () => {
    const { toggleTheme, themeName } = useThemeContext()


    return (
        <button
            onClick={toggleTheme}
            className="w-12 h-6  bg-(--color1) text-(--color2) rounded-lg overflow-hidden"
            aria-label="Toggle theme"
        >
            
            <div className={`h-6 w-24 z-50   transform transition-all duration-500 flex justify-evenly items-center 
                ${ themeName === 'light' ? '-translate-x-2' : '-translate-x-10' }`}>
                
                <Sun size={20} />

                <Moon  size={20} />

            </div>
        </button>
    )
}

