import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../auth/context";
import { auth } from "../auth/firebase.config";
import { baseURL } from "../auth/context";

const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [socket, setSocket] = useState(null);
    const [ onlineUsers, setOnlineUsers ] = useState({});


    useEffect(() => {
        return; // 

        
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, setOnlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
