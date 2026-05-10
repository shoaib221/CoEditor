import React from 'react';
import { IoArrowUpSharp } from "react-icons/io5";


export const ScrollToTop = () => {

    

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div title='Back To Top' onClick={ scrollToTop } className='fixed cen-hor text-xl
        bottom-4 right-4 z-30 h-10 w-10 rounded-full border-2 border-(--color1) bg-(--color4) text-(--color1)' >
            <IoArrowUpSharp  />
        </div>
    );
};

