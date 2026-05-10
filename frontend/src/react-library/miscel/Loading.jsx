import React from 'react';

export const Loading = () => {
    return (
        <div style={{ flexGrow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '3rem', minWidth: '3rem' }} >
            <span className="loading loading-dots loading-xl"></span>
        </div>
        
    );
};

