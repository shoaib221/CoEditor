

import { useAuthContext } from "@/react-library/auth/context";
import { useSocketContext } from "@/react-library/socket/socket";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";
import { baseURL } from "@/react-library/auth/context";

export const Chat = () => {
    const [messages, setMessages] = useState(null);
    const { user, axiosInstance } = useAuthContext();
    const { socket, onlineUsers, setOnlineUsers } = useSocketContext();
    const { register, reset, handleSubmit, watch } = useForm();
    const { id } = useParams()
    const [partner, setPartner] = useState(null)
    const [loading, setLoading] = useState(false)
    const [board, setBoard] = useState("editor")
    const editorRef = useRef(null);
    const ydoc = useMemo(() => new Y.Doc(), []);
    const yText = ydoc.getText("monaco", [ydoc]);
    

    function handleMount(editor) {
        editorRef.current = editor;
        const provider = new SocketIOProvider(baseURL, "monaco", ydoc, {
            autoConnect: true,
        });
        const monacoBinding = new MonacoBinding(yText, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
    }

    useEffect(() => {
        if(  !editorRef.current || !user) return;

        

        // provider.awareness.setLocalStateField("user", {
        //     name: user.name,
        //     username: user.username,
        // });

        // provider.awareness.on("change", () => {
        //     const states = Array.from(provider.awareness.getStates().values());
        //     setOnlineUsers( states.map(state => state.user).filter(u => Boolean(u.username) ) )
        // });

    }, [editorRef, user])


    async function FetchMessage() {
        setLoading(true)
        try {
            let res = await axiosInstance.post('/chat/fetch-message', { id });
            setPartner(res.data.partner);
            console.log(res.data)
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }


    


    useEffect(() => {
        if (!id || !user) return;
        FetchMessage();
    }, [id, user])


    if (!partner) return <Loading />

    return (
        <div className="grow  flex flex-col bg-(--color1a) justify-between"  >

            <div className="h-10 min-h-[2rem] flex justify-between px-8 items-center" >
                <div className="flex gap-2 items-center" >
                    {partner.name} {onlineUsers[partner.username] ? <div className="h-2 w-2 rounded-full bg-green-400" ></div> : ""}
                </div>

                <IoSettingsOutline onClick={() => setBoard(prev => prev === 'editor' ? 'settings' : 'editor')} className="cursor-pointer" />

            </div>

            <div className="h-[calc(100vh-6rem)] border bg-red-700" >

                {
                    board === "editor" && <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        defaultValue="// Start coding..."
                        theme="vs-dark"
                        onMount={handleMount}
                    />
                }

                {
                    board === "settings" && <ChatSettings partner={partner} />
                }

            </div>



        </div>
    )
}

