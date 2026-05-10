import React from 'react';

export const NotFound = () => {
    return (
        <div  className='cen-ver flex-grow' >
            <title>404</title>
            <img src='/error-404.png' style={ { height: '50vh' } } />
            <div style={{ color: 'var(--color3-1)', fontSize: '3rem', fontWeight: '600' }} > Page Not Found </div>
        </div>
    );
};

