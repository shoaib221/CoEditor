import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/react-library/auth/context";
import { StarRating } from "../utils/StarRating";
import { ImCrop, ImCross } from "react-icons/im";
import { Modal1 } from "@/react-library/Modal/modal";

// Edit review
const ReviewModal = ({ open, review, show }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const { axiosInstance } = useAuthContext();
    const textareaRef = useRef(null);

    // ✅ sync state ONLY when modal opens or review changes
    useEffect(() => {
        if (open && review) {
            setComment(review.comment ?? "");
            setRating(review.rating ?? 0);
        }
    }, [open, review]);

    useEffect(() => {
        if (open) textareaRef.current?.focus();
    }, [open]);

    const UpdateReview = async () => {
        console.log(comment, rating)
        try {
            await axiosInstance.post("/scholarship/update-review", {
                ...review,
                comment,
                rating,
            });
            show(null, false);
        } catch (err) {
            console.error(err?.response?.data?.error || err);
        }
    };

    if (!review) return null;

    //console.log(review)

    return (
        <Modal1 isOpen={open} >

            <button
                onClick={() => show(null, false)}
                className="rounded-full absolute top-2 right-2 py-2 px-4 cursor-pointer hover:opacity-80"
            >
                <ImCross />
            </button>

            <br />

            <div className="mb-2 text-xl text-center font-bold text-(--color1)">Edit review</div>

            <div className="font-bold" > {review.scholarshipDetails.scholarshipName} </div>

            <span>Application ID#</span>
            <span> {review.applicationId} </span>

            <br /><br />
            <label>
                <div className="font-bold" >Comment</div>
                <textarea
                    ref={textareaRef}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="h-40 w-full resize-none rounded border p-2 focus:outline-none focus:ring"
                    placeholder="Write your review..."
                />
            </label>

            <span className="mt-4 font-bold">Rating</span>
            <StarRating value={rating} onChange={setRating} />

            <div className="mt-4 flex justify-center gap-3">


                <button
                    onClick={UpdateReview}
                    className="button-91"
                >
                    Update
                </button>
            </div>
        </Modal1>
    );
};

export const useEditReview = () => {
    const [open, setOpen] = useState(false);
    const [review, setReview] = useState(null);

    const showModal = (reviewPar, flag) => {
        if (flag && reviewPar) {
            setReview(reviewPar);
        }
        if (!flag) {
            setReview(null);
        }
        setOpen(flag);
    };

    const ModalTag = () => (
        <ReviewModal
            open={open}
            review={review}
            show={showModal}
        />
    );

    return { ModalTag, showModal };
};
