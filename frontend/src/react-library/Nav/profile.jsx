import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../auth/context";
import { useNavigate } from "react-router-dom";
import { ThemeButton3 } from "../Theme/Theme";



export const ProfileLogo1 = ({ image = "/avatar.jpg", }) => {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, LogOut } = useAuthContext();
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    if(!user) return <button className="button-4" onClick={ () => navigate('/auth') } >Login</button>

    return (
        <div className="relative flex gap-4 items-center" ref={dropdownRef}>
            
            <ThemeButton3 />

            <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-(--color4) focus:outline-none"
            >
                <img
                    src={user?.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute top-[100%] right-0 w-48 bg-(--color4) text-(--color1) opacity-100 rounded-lg  z-50">
                    <ul className="py-1 text-sm">
                        <li className="w-full text-left px-4 py-2 hover:opacity-80 cursor-pointer"
                            onClick={ () => navigate( '/profile' ) }
                        >

                                Profile
                            
                        </li>
                        
                        

                        <li
                            className="w-full text-left px-4 py-2 hover:opacity-80 cursor-pointer"
                            onClick={() => LogOut() }
                        >
                                LogOut
                            
                        </li>
                        
                        
                    </ul>
                </div>
            )}
        </div>
    );
};

