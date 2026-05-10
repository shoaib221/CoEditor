

import React from 'react';
import './button.css';
import { useNavigate } from 'react-router-dom';



export const Button1 = ({ children }) => {
    return (
        <button className='w-full flex flex-col btn-1' >
            {children}
        </button>
    );
};

export const Button2 = (props) => {
    

    return (

        <button {...props}  className='bg-[var(--color4)] text-(--color1) px-4 py-2 rounded-lg hover:opacity-80'  >{props.children}</button>
    )
}

export const Button3 = (props) => {
    return (
        <button {...props} className='bg-(--color5) text-(--color1) px-4 py-2 rounded-lg  hover:opacity-80'  >
            {props.children}
        </button>
    )
}

export const Button4 = (props) => {
    const navigate = useNavigate();

    return (
        <button {...props}  className='font-bold bg-(--color1) text-(--color4) px-4 py-2 rounded-lg hover:opacity-70'  >
            { props.children }
        </button>
    )
}
