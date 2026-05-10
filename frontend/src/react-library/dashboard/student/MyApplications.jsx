import React from 'react';
import { useAuthContext } from '@/react-library/auth/context';
import { useDetailApplication } from './useDetailApplication';
import { useEditApplication } from './useEditApplication';
import { useAddReview } from './useReview';
import "./student.css";

export const MyApplications = () => {
    const [ applications, setApplications ] = React.useState([]);
    const { axiosInstance, user } = useAuthContext();
    const { DetailTag, showDetail } = useDetailApplication();
    const { EditTag, showEdit } = useEditApplication();
    const { ReviewTag, showReview } = useAddReview();
    

    const fetchApplications = async () => {
        let response = await axiosInstance.get('/scholarship/my-applications');
        setApplications(response.data.applications);
        console.log("Fetched applications:", response.data.applications);
    }

    React.useEffect( () => {
        if( !user ) return;
        fetchApplications();
    }, [user] )
        




    return (
        <div>
            <DetailTag  />
            <EditTag  />
            <ReviewTag  />
            
            <div className='mt-4 flex flex-col gap-4' >
                { applications && applications.map( (application) => (
                    <div key={application._id} className='justify-between p-4 rounded-lg flex box-1212 gap-2 flex-col md:flex-row' >

                        <div>
                            <div className='font-semibold text-lg text-(--color4)' >{ application.scholarshipDetails.scholarshipName }</div>
                            <div className='text-sm text-(--color2)' >Status: { application.applicationStatus }</div>
                        </div>

                        <div className='flex gap-2' >
                            <button 
                                className='button-1234'
                                onClick={ () => showDetail( application, true, fetchApplications) } >Detail</button>
                            { application.applicationStatus === 'approved' &&  <button onClick={ () => showReview( application, true ) }  className='button-1234'>Review</button> }
                            { application.applicationStatus === 'pending' &&
                                <button 
                                className='button-1234'
                                onClick={ () => showEdit( application, true) } >Edit</button>
                            
                            }
                        </div>
                        
                    </div>
                )) }
            </div>
            
        </div>
    );
};

