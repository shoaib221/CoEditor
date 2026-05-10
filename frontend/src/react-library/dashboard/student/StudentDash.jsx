import React, { useEffect, useState } from 'react';
import { UpdateProfile } from "@/react-library/auth/UpdateProfile";
import { MyApplications } from './MyApplications';
import { Review } from './Review';
import { useNavigate, useSearchParams } from 'react-router-dom';


export const StudentDash = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const curBoard = searchParams.get("board");
    const navigate = useNavigate()
    const [cur, setCur] = useState(curBoard ? curBoard : 'profile')

    useEffect(() => {
        let board = searchParams.get("board");
        setCur(board);
    }, [searchParams])


    return (
        <div className='flex flex-col lg:flex-row gap-8 flex-1' >
            <title> ScholarStrem | Dashboard</title>

            <div className='overflow-auto' >
                <div className='sticky top-0 flex lg:flex-col gap-2 p-2 lg:min-w-[15rem]' >
                    <div className={`${cur === 'profile' ? 'button-1234sel' : ""} button-1234 box-1212 cursor-pointer`} onClick={() => navigate('/dashboard?board=profile')} > My Profile</div>
                    <div className={`${cur === 'my-apps' ? 'button-1234sel' : ""} button-1234 box-1212 cursor-pointer`} onClick={() => navigate('/dashboard?board=my-apps')} > My Applications</div>
                    <div className={`${cur === 'reviews' ? 'button-1234sel' : ""} button-1234 box-1212 cursor-pointer`} onClick={() => navigate("/dashboard?board=reviews")} >My Reviews</div>
                </div>
            </div>

            <div className='flex-1' >
                {cur === 'profile' && <UpdateProfile />}
                {cur === 'my-apps' && <MyApplications />}
                {cur === 'reviews' && <Review />}
            </div>
        </div>
    );
};

