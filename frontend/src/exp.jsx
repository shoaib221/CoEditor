import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { backendSocket, useAuthContext } from "@/react-library/auth/context";


export function MonacoEditor( { roomId } )
{
    const editorRef = useRef(null);
    const wsRef = useRef(null);
    const ydocRef = useRef(new Y.Doc());
    const ytextRef = useRef( ydocRef.current.getText("code") );
    const { authToken } = useAuthContext();
    console.log(roomId);

    useEffect(() => {
        if( !roomId || !authToken ) return;
        const ws = new WebSocket( `${backendSocket}?room=${roomId}&authToken=${authToken}` );

        ws.binaryType = "arraybuffer";

        wsRef.current = ws;

        ws.onopen = () => {
            console.log( "Connected to web socket" );
        };

        ws.onerror = (err) => {
            console.error( "WebSocket error", err );
        };

        ws.onclose = () => {
            console.log(
                "Disconnected from web socket"
            );
        };

        // receiving changes from other coders
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.header !== "update") return;
            const update = new Uint8Array(message.update);

            Y.applyUpdate(
                ydocRef.current,
                update
            );
        };

        // sending updates to other coders
        const handleUpdate = (update) => {
            if ( ws.readyState === WebSocket.OPEN ) 
            {
                ws.send( JSON.stringify({
                    header: "update",
                    update: Array.from(update)
                }) );
            }
        };

        ydocRef.current.on( "update", handleUpdate );

        return () => {
            ydocRef.current.off(
                "update",
                handleUpdate
            );

            ws.close();
        };
    }, [roomId, authToken]);


    // mounting monaco editor
    const handleEditorMount = ( editor ) => {
        editorRef.current = editor;

        const model = editor.getModel();

        new MonacoBinding(
            ytextRef.current,
            model,
            new Set([editor])
        );
    };

    return (
        <div style={{ width: "100%", height: "100%", }} >

            <Editor
                height="100%"
                defaultLanguage="javascript"
                defaultValue="// Start coding together..."
                theme="vs-dark"
                onMount={
                    handleEditorMount
                }
            />

        </div>
    );
}