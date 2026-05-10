import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@/react-library/auth/context';
import { useDetail, useFeedback } from './ApplicationHook'
import { Loading } from '@/react-library/miscel/Loading';


export const ManageApplications = () => {
    const [ applications, setApplications ] = useState(null);
    const { axiosInstance, user } = useAuthContext();
    const { DetailTag, showDetail } = useDetail();
    const { FeedbackTag, showFeedback } = useFeedback();

    async function fetchApplications() {
        let res = await axiosInstance.get('/scholarship/applications');
        setApplications(res.data.applications);
    }

    useEffect( () => {
        if(!user) return;
        fetchApplications();
    }, [user] );


    return (
        <div>
            <DetailTag />
            <FeedbackTag />
            
            <div className='mt-4 flex  flex-col gap-4' >
                { applications ? applications.map( (application) => (
                    <div key={application._id} className='gap-2 justify-between box-1212 p-4 rounded-lg flex-col md:flex-row flex text-(--color2)' >
                        <div>
                            <div className='font-semibold text-lg text-(--color4)' > { application.scholarshipDetails.scholarshipName }</div>
                            <div className='text-sm text-(--color2a)' >Applicant: { application.applicantName }</div>      
                            <div className='text-sm text-(--color2a)' >Status: { application.applicationStatus }</div>
                        </div>
                        <div className='flex gap-2' >
                            <button className='button-1234' onClick={ () => showDetail(application, true) } >View Details</button>  
                            <button className='button-1234' onClick={ () => showFeedback(application, true) } >Feedback</button>   
                        </div>
                    </div>
                ))
                :
                <Loading />
             }
            </div>
        </div>
    );
};

