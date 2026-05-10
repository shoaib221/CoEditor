// npm install

import React from 'react';
import Marquee from "react-fast-marquee";



export const NewsMarquee = () => {
    
    return (
        <Marquee speed={60} gradient={false}>
            🚀 Welcome to my React App! — This is a scrolling text using react-fast-marquee 🎉
        </Marquee>
    );
};

