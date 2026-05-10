// npm install date-fns

import React from 'react';
import { format } from "date-fns";



export const TimeDate = ({date}) => {
    return (
        // <span>{format( new Date(date) , "EEEE, MMMM do, yyyy 'at' h:mm a")}</span>
        <span>{format( new Date(date) , "MMMM do, yyyy")}</span>
    );
};

