

import { useAuthContext } from "@/react-library/auth/context";
import { useSocketContext } from "@/react-library/socket/socket";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegSmile } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { LuAudioLines } from "react-icons/lu";
import { Message1 } from "@/react-library/miscel/message";
import './chat.css';
import { PrivateRoute } from "@/react-library/auth/RestrictedRoutes";
import { useParams } from "react-router-dom";
import { uploadToCloudinary } from "@/react-library/Media/cloudinary_upload";
import { Loading } from "@/react-library/miscel/Loading";
import { NotFound } from "@/react-library/miscel/NotFound";
import { IoSettingsOutline } from "react-icons/io5";
import { ChatSettings } from "./chat-settings";
import { Editor } from "@monaco-editor/react";


export const Chat = () => {
    const [messages, setMessages] = useState(null);
    const { user, axiosInstance } = useAuthContext();
    const { socket, onlineUsers } = useSocketContext();
    const { register, reset, handleSubmit, watch } = useForm();
    const { id } = useParams()
    const [partner, setPartner] = useState(null)
    const [loading, setLoading] = useState(false)
    const [board, setBoard] = useState("editor")

    


    useEffect(() => {
        if (!socket || !partner) return;

        const handleReceiveMessage = (data) => {
            console.log("message received:", data, partner);
            if (partner.username !== data.messages[0].sender) return;



            setMessages(prevnew_messages => {

                let new_messages = prevnew_messages;
                new_messages = new_messages.concat(data.messages);
                return new_messages;
            });
        };

        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };

    }, [socket, partner]);



    

    return (
        <div className="relative h-[calc(100vh-60px)] grow bg-(--color1)"  >
            <div className="h-10 absolute p-2 top-0 left-0 right-0 bg-(--color1) flex z-10 gap-4 items-center  justify-between px-12" >
                <div className="flex gap-2 items-center" >
                    {partner.name} {onlineUsers[partner.username] ? <div className="h-2 w-2 rounded-full bg-green-400" ></div> : ""}
                </div>

                <IoSettingsOutline onClick={() => setBoard(prev => prev === 'message' ? 'settings' : 'message')} className="cursor-pointer" />

            </div>

            {
                board === "editor" && <Editor 
                    height="100%"
                    defaultLanguage="javascript"
                    defaultValue="// Start coding..."
                    theme="vs-dark"
                />
            }

            {
                board === "settings" && <ChatSettings partner={partner} />
            }



        </div>
    )
}

