import React from 'react';
import { AdminDash } from './admin/AdminDash.jsx';
import { StudentDash } from './student/StudentDash.jsx';
import { ModeratorDash } from './moderator/ModeratorDash.jsx';
import { useAuthContext } from '@/react-library/auth/context';
import { ForbiddenAccess, PrivateRoute } from '@/react-library/auth/RestrictedRoutes';
import { Loading } from '@/react-library/miscel/Loading.jsx';


export const Dashboard = () => {
    const { user, loading } = useAuthContext();
    if(loading) return <Loading />;

    return (
        <PrivateRoute>
            { user?.role === 'moderator' &&  <ModeratorDash /> }
            { user?.role === 'admin' && <AdminDash /> }
            { user?.role === 'student' && <StudentDash /> }
        </PrivateRoute>
    )
    
};



// What is the Project? "ScholarStream" is a full-stack MERN application designed to 
// connect students with scholarship opportunities. It allows universities or organizations 
// to post scholarships and students to search and apply for them. 
// Why should we develop the project?  To simplify the complex process of finding 
// f
// inancial aid for education. A centralized platform helps students discover 
// opportunities they might miss and streamlines the application review process for 
// administrators. 
// How the system works: 
// 1. Students browse scholarships, view details, and apply by paying an application 
// fee. 
// 2. Moderators review these applications, provide feedback, and update the 
// application status (Pending -> Processing -> Completed). 
// 3. Admins Manage users, add/edit scholarships, and view analytics. 
