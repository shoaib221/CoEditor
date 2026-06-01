import { createContext, useContext, useEffect, useRef, useState } from "react";
import { backendSocket, useAuthContext } from "@/react-library/auth/context";

const socketContext = createContext();
export const useSocketContext = () => useContext(socketContext);


export function SocketProvider({ children }) {
    const wsRef = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState(new Set());
    const { authToken } = useAuthContext();

    useEffect(() => {

        if(!authToken) return;

        const ws = new WebSocket(
            `${backendSocket}?authToken=${authToken}`  // 
        );

        wsRef.current = ws;

        ws.onopen = () => {
            console.log( "Connected" );
        };

        ws.onmessage = (event) => {

            try {

                const message = JSON.parse( event.data );

                if ( message.header === "onlineUsers" ) {
                    let set1 = new Set( message.users );
                    setOnlineUsers( set1 );
                    console.log("Online users updated", message.users);
                }
            }
            
            catch (err) {
                console.error(err);
            }
        };

        return () => {
            ws.close();
        };

    }, [authToken]);



    const sendMessage = ( header, payload = {} ) => {

        if (
            wsRef.current &&
            wsRef.current.readyState ===
            WebSocket.OPEN
        ) {
            wsRef.current.send(
                JSON.stringify({
                    header,
                    ...payload
                })
            );
        }
    };

    return (
        <socketContext.Provider
            value={{
                sendMessage,
                onlineUsers,
                setOnlineUsers
            }}
        >
            {children}
        </socketContext.Provider>
    );
}