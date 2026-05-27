

import { useAuthContext } from "@/react-library/auth/context";
import { useSocketContext } from "@/react-library/socket/socket";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import './chat.css';
import { PrivateRoute } from "@/react-library/auth/RestrictedRoutes";
import { useParams } from "react-router-dom";
import { uploadToCloudinary } from "@/react-library/Media/cloudinary_upload";
import { Loading } from "@/react-library/miscel/Loading";
import { NotFound } from "@/react-library/miscel/NotFound";
import { IoSettingsOutline } from "react-icons/io5";
import { ChatSettings } from "./chat-settings";
import { Editor } from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";
import { baseURL } from "@/react-library/auth/context";
import { MonacoEditor } from "@/exp";


export const Chat = () =>  {

    
    const { user, axiosInstance } = useAuthContext();
    const { id } = useParams();
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [board, setBoard] = useState("editor");
    
    

    


    async function FetchFriend() {
        
        try {
            let res = await axiosInstance.get(`/editor/friend/${ id }`)
            setPartner( res.data.friend )
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }


    


    useEffect(() => {
        if (!id || !user) return;
        FetchFriend();
    }, [id, user])


    if (!partner) return <Loading />

    return (
        <div className="grow  flex flex-col bg-(--color1a) justify-between"  >

            <div className="min-h-[2rem] flex justify-between px-8 items-center" >
                <div className="flex gap-2 items-center" >
                    {partner.name} { partner ? <div className="h-2 w-2 rounded-full bg-green-400" ></div> : ""}
                </div>

                <IoSettingsOutline onClick={() => setBoard(prev => prev === 'editor' ? 'settings' : 'editor')} className="cursor-pointer" />

            </div>

            <div className="h-[calc(100vh-6rem)] border bg-red-700" >

                {
                    board === "editor" && <MonacoEditor roomId = { partner.friendship.roomId } />
                }

                {
                    board === "settings" && <ChatSettings partner={partner} />
                }

            </div>



        </div>
    )
}

