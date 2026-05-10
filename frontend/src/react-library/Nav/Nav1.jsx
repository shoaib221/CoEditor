import React from 'react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button1 } from '../Buttons/button';


export const SlidePrompt = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ flexGrow: '1' }} >
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                {isOpen ? "Hide Prompt" : "Show Prompt"}
            </button>

            {/* Sliding Prompt */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="absolute top-0 left-0 h-full w-64 bg-white shadow-2xl flex flex-col items-center justify-center border-r border-gray-300"
                    >
                        <Button1>
                            Home
                        </Button1>

                        <Button1 onClick={ () => set } >
                            Cancel
                        </Button1>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

