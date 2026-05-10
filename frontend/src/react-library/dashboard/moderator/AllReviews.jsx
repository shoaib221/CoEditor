import React from 'react';
import { useAuthContext } from '@/react-library/auth/context';
import { useReviewDetail } from "../student/useReview.jsx"
import { Loading } from '@/react-library/miscel/Loading.jsx';

export const AllReviews = () => {
    const { axiosInstance, user } = useAuthContext();
    const [ reviews, setReviews ] = React.useState(null);
    const { ReviewDetailTag, showReviewDetail } = useReviewDetail()

    async function FetchReviews() {
        let res = await axiosInstance.get('scholarship/reviews');
        setReviews(res.data.reviews);
    }

    React.useEffect( () => {
        if(!user) return;
        FetchReviews();
    }, [user] );


    return (
        <div>
            <ReviewDetailTag />
            
            <div className='mt-4 flex flex-col gap-4' >
                { reviews ? reviews.map( (review) => (
                    <div key={review._id} className='gap-2 justify-between box-1212 p-4 rounded-lg flex-col md:flex-row flex' >
                        <div>
                            <div className='font-semibold text-lg text-(--color4)' > { review.scholarshipDetails.scholarshipName }</div>
                            <div className='text-sm text-(--color2)' >Reviewer: { review.reviewerName }</div>
                            
                        </div>

                        <div>
                            <button className='button-1234' onClick={ () => showReviewDetail( review, true ) } >Detail</button>
                            
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

