import React from 'react';

export const Breaker = ({ message }) => {
    if(message) return (
        <div style={{ width: '100%', display: 'flex', gap: '.5rem', alignItems: 'center' }} >
            <div style={{ flexGrow: '1', height: '2px', backgroundColor: 'var(--color2)' }} ></div>
            <div>{message}</div>
            <div style={{ flexGrow: '1', height: '2px', backgroundColor: 'var(--color2)' }} ></div>
        </div>
    );


    return (
        <div style={{ width: '100%', display: 'flex', gap: '.5rem', alignItems: 'center' }} >
            <div style={{ flexGrow: '1', height: '1px', backgroundColor: 'var(--color2)' }} ></div>
            
        </div>
    )
};


export const Spacer = () => {

    return (
        <div style={{ height: '2rem', width: '100%', display: 'block' }} >

        </div>
    )
}
