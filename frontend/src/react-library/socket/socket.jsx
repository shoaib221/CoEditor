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
        if (!user) return;

        let socketInstance;

        const connectSocket = async () => {
            const token = await auth.currentUser.getIdToken(true); // 🔥 FIX

            socketInstance = io(baseURL, {
                transports: ["websocket"],
                auth: { token },
            });

            socketInstance.on("connect", () => {
                console.log("Socket connected:", socketInstance.id);
            });

            socketInstance.on("connect_error", (err) => {
                console.error("Socket error:", err.message);
            });

            setSocket(socketInstance);

            socketInstance.on("online-users", (data) => {
                console.log("Online users:", data.onlineUserMap);
                setOnlineUsers(data.onlineUserMap);
            });
        };

        connectSocket();

        return () => {
            if (socketInstance) socketInstance.disconnect();
            setSocket(null);
        };
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
