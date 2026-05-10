import React, { useEffect, useState } from 'react';
import { AddScholarship } from './AddScholarship';
import { ManageScholarships } from './ManageScholarships';
import { ManageUsers } from './ManageUsers';
import { Analytics } from './Analytics';
import { UpdateProfile } from '@/react-library/auth/UpdateProfile';
import { useNavigate, useSearchParams } from 'react-router-dom';


export const AdminDash = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const curBoard = searchParams.get( "board" );
    const navigate = useNavigate()
    const [ cur, setCur ] = useState( curBoard? curBoard : 'profile')
    
    useEffect(() => {
        let board = searchParams.get( "board" );
        setCur(board);
    }, [searchParams])


    return (
        <div className='flex flex-col lg:flex-row gap-4' >
            
            <div className='overflow-auto' >
                <div className='sticky top-0 flex lg:flex-col gap-2 p-2 lg:min-w-[15rem]' >
                    <div className={`${ cur === 'profile'? 'button-1234sel': ""  } button-1234 box-1212 cursor-pointer min-w-32`} style={{ minWidth: '8rem' }} onClick={ () => navigate('/dashboard?board=profile') } >My Profile</div>
                    <div className={`${ cur === 'add'? 'button-1234sel': ""  } button-1234 box-1212 cursor-pointer min-w-32`} style={{ minWidth: '8rem' }} onClick={ () => navigate('/dashboard?board=add') } >Add Scholarship</div>
                    <div className={`${ cur === 'scholarships'? 'button-1234sel': ""  } button-1234 box-1212 cursor-pointer min-w-32`} style={{ minWidth: '8rem' }} onClick={ () => navigate('/dashboard?board=scholarships') } > Manage Scholarships </div>
                    <div className={`${ cur === 'users'? 'button-1234sel': ""  } button-1234 box-1212 cursor-pointer min-w-32`} style={{ minWidth: '8rem' }} onClick={ () => navigate( '/dashboard?board=users' ) } > Manage Users </div>
                    <div className={`${ cur === 'ana'? 'button-1234sel': ""  } button-1234 box-1212 cursor-pointer min-w-32`} style={{ minWidth: '8rem' }} onClick={ () => navigate( '/dashboard?board=ana' ) } > Analytics </div>
                </div>
            </div>

            <div className='flex-grow' >
                { cur === 'add' && <AddScholarship /> }
                { cur === 'scholarships' && <ManageScholarships /> }
                { cur === 'users' && <ManageUsers /> }
                { cur === 'ana' && <Analytics /> }
                { cur === 'profile' && <UpdateProfile /> }
            </div>
            
        </div>
    );
};



// 1. Admin Dashboard 
// ● My Profile: View profile info. 
// ● Add Scholarship: A form to create new scholarships. 
// ○ Fields: Scholarship Name, University Name, Image, Country, City, World 
// Rank, Subject Category, Scholarship Category, Degree, Tuition Fees 
// (optional), Application Fees, Service Charge, Deadline, Post Date, User 
// Email. 
// ● Manage Scholarships: Display a table of all scholarships added to the platform. 
// ○ Action: "Update" (Button to edit scholarship details). 
// ○ Action: "Delete" (Button to remove the scholarship). 
// ● Manage Users: A table of all users. 
// ○ Filter: Dropdown to filter by role (Student/Moderator/Admin). 
// ○ Action: Change Role (Promote Student to Moderator or Admin, or demote). 
// ○ Action: Delete User. 
// ● Analytics: Visualize platform data. 
// ○ Total Users, Total Fees Collected, Total Scholarships. 
// ○ Chart: A Bar Chart or Pie Chart showing application counts per University 
// or Scholarship Category.