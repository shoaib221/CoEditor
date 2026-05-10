import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/react-library/auth/context";
import { set } from "react-hook-form";
import { StarRating } from "../utils/StarRating";
import { toast } from "react-toastify";
import { TimeDate } from "@/react-library/miscel/TimeDate";
import { ImCross } from "react-icons/im";
import { Modal1 } from '@/react-library/Modal/modal.jsx'


const ReviewTag = ({ open, app, show }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const { axiosInstance } = useAuthContext();
    const textareaRef = useRef(null);

    // ✅ sync state ONLY when modal opens or review changes


    useEffect(() => {
        if (open) textareaRef.current?.focus();
    }, [open]);

    const AddReview = async () => {
        if (!app) return;

        const info = {
            applicationId: app._id,
            scholarshipId: app.scholarshipId,
            rating, comment
        };

        console.log("Submitting review:", info);

        try {
            let res = await axiosInstance.post("/scholarship/add-review", info);
            toast.success("Review Added")
            show(null, false)
        } catch (err) {
            console.error(err);
        }
    };

    if ( !app) return null;



    return (
        <Modal1 isOpen={open} >
            <button
                onClick={() => show(null, false)}
                className="rounded-full absolute top-2 right-2 py-2 px-4 cursor-pointer hover:opacity-80"
            >
                <ImCross />
            </button>

            <br />
            <div className="mb-2 text-lg font-bold text-center text-(--color1)"> Application ID # {app._id} </div>


            <div className="font-bold" > {app.scholarshipDetails.scholarshipName} </div>



            <br />

            <textarea
                ref={textareaRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="h-40 w-full resize-none rounded border p-2 focus:outline-none focus:ring"
                placeholder="Write your review..."
            />

            <span className="font-bold">Rating</span>
            <StarRating value={rating} onChange={setRating} />


            <div className="mt-4 flex justify-center gap-3">


                <button
                    onClick={AddReview}
                    className="button-91"
                >
                    Add Review
                </button>
            </div>
        </Modal1>
    );
};


export const useAddReview = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [applicationData, setApplicationData] = React.useState(null);


    const showReview = (app, flag) => {
        setIsOpen(flag);
        console.log(app);
        if (app) {
            setApplicationData(app);
        }
    };

    let Tag = () => {
        return <ReviewTag open={isOpen} app={applicationData} show={showReview} />
    }


    return { ReviewTag: Tag, showReview };
};


// review detail

let ReviewDetailTag = ({ review, isOpen, showReviewDetail }) => {
    const { axiosInstance } = useAuthContext()

    useEffect(() => {
        if (!review) return;

    }, [review])


    const DeleteReview = async () => {
        try {
            let res = await axiosInstance.post(`/scholarship/remove-review`, review);
            console.log("Review deleted:", res.data);
            showReviewDetail(null, false);
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    }
    console.log(review)

    if(!review) return null;

    return (
        <Modal1 isOpen={isOpen} >

            <button className="rounded-full absolute top-2 right-2 py-2 px-4 cursor-pointer hover:opacity-80" onClick={() => showReviewDetail(null, false)} >
                <ImCross />
            </button>
            <br />

            <div className="text-center font-bold text-(--color1) text-xl" >
                Review Detail
            </div>
            <br />

            <span className="font-bold" >

                {review.scholarshipDetails.scholarshipName} ,

            </span>
            <span className="text-(--color3)" > {review.scholarshipDetails.scholarshipCategory} </span>

            <br />

            <div>
                {review.scholarshipDetails.degree} in {review.scholarshipDetails.subjectCategory}
            </div>



            <div >
                {review.scholarshipDetails.universityName}

            </div>

            <div>
                {review.scholarshipDetails.city}, {review.scholarshipDetails.country}
            </div>



            <br />
            <div>
                <span className="font-bold" >Applicant</span>
                <span> {review.reviewerName} </span>
            </div>

            <div>
                <span className="font-bold" >Application ID # </span>
                <span> {review.applicationId} </span>
            </div>

            <br />

            <div>
                <div className="font-bold" >Comment: </div>
                <div>{review.comment}</div>
            </div>

            <div>
                <span className="font-bold" >Rating: </span>
                <span>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            style={{
                                cursor: "pointer",
                                fontSize: "28px",
                                color: (review.rating) >= star ? "#facc15" : "#d1d5db",
                                transition: "color 0.2s",
                            }}

                        >
                            ★
                        </span>
                    ))}

                </span>
            </div>

            <div>
                <span className="font-bold" >Reviewed at: </span>
                <TimeDate date={review.date} />
            </div>




            <div className="flex justify-center gap-4 mt-4" >

                <button className="button-91" onClick={DeleteReview} >Delete</button>
            </div>
        </Modal1>
    )

}


export const useReviewDetail = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [review, setReview] = React.useState(null);


    let showReviewDetail = (rev, flag) => {
        if (rev) setReview(rev);
        console.log(rev)
        setIsOpen(flag)
    }

    const Tag = () => {
        return <ReviewDetailTag isOpen={isOpen} review={review} showReviewDetail={showReviewDetail} />
    }

    return { ReviewDetailTag: Tag, showReviewDetail };
}