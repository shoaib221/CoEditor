

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/react-library/auth/context";
import { toast } from "react-toastify";
import { TimeDate } from "@/react-library/miscel/TimeDate";
import { ImCrop, ImCross } from "react-icons/im";
import { Modal1 } from "@/react-library/Modal/modal";


const DetailTag = ({ application, isOpen, showDetail }) => {
    const [status, setStatus] = useState(null)
    const { axiosInstance } = useAuthContext()

    useEffect(() => {

        if (application && isOpen) {
            setStatus(application.applicationStatus)
        }

    }, [application, isOpen])

    let Decision = async () => {
        const info = {
            ...application,
            approve: status
        }

        try {
            let response = await axiosInstance.post('/scholarship/decision', info);
            console.log("Decision response:", response);
            showDetail(null, false)
        } catch (err) {
            console.error("Decision error:", err);
        }
    }

    if (!application) return null;

    return (
        <Modal1 isOpen={isOpen} >

            <button className="cursor-pointer absolute top-2 right-4 px-4 py-2 rounded-full hover:opacity-70" onClick={() => showDetail(null, false)} >
                <ImCross />
            </button>

            <br />

            <div className="text-center font-bold text-(--color1) text-lg" >
                Application ID # {application._id}
            </div>

            <div className="flex flex-col gap-2 mt-4" >
                <div>
                    <span className="font-bold text-(--color1)" >{application.scholarshipDetails.scholarshipName}, </span>

                    <span className="text-(--color3)" >{application.scholarshipDetails.scholarshipCategory}</span>
                    <div> {application.scholarshipDetails.universityName} </div>

                    <div>{application.scholarshipDetails.degree} in {application.scholarshipDetails.subjectCategory}</div>
                </div>

                <br />

                <div>
                    <div className="font-bold text-(--color1)" > Applicant's Detail </div>
                    <div> Name : {application.applicantName} </div>
                    <div> Contact : {application.applicantEmail} </div>

                </div>



                <div className="font-bold" >Education : </div>
                <div> {application.education ? application.education : "No data available"} </div>

                <div className="font-bold" >Extracurriculars : </div>
                <div> {application.extras ? application.extras : "No data Available"} </div>



                <div className="font-bold" >
                    Message :
                </div>

                <div>
                    {application.message ? application.message : "No message"}
                </div>

                <br />

                <div className="font-bold text-(--color1)" > Status </div>
                <div> <span className="font-bold" >Submitted On:</span> <TimeDate date={application.applicationDate} /> </div>

                <div> <span className="font-bold"> Application Status : </span>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}
                        className="bg-(--color4) text-(--color1a)"
                    >
                        <option value="pending"  >Pending</option>
                        <option value="approved"  >Approved</option>
                        <option value="processing"  >Processing</option>
                        <option value="rejected"  >Rejected</option>
                    </select>
                </div>

                <div>
                    <span className="font-bold" > Payment Status: </span> {application.paymentStatus}

                </div>

                <br />

                <div>
                    <div className="font-bold text-(--color1)" >Feedback </div>
                    <div>{application.feedback ? application.feedback : "No feedback yet"}</div>

                </div>

                <br />





            </div>
            <br />
            <div className="flex justify-center gap-4 mt-4" >
                <button className="button-91" onClick={Decision} >Update</button>

            </div>
        </Modal1>
    );
}


export const useDetail = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [application, setApplication] = useState(null)


    let showDetail = (item, flag) => {
        console.log(item)
        if (item) setApplication(item);
        setIsOpen(flag);
    }


    const Tag = () => {
        return <DetailTag isOpen={isOpen} showDetail={showDetail} application={application} />
    }


    return { DetailTag: Tag, showDetail };
}




const FeedbackTag = ({ isOpen, show, app }) => {
    const [feedback, setFeedback] = useState(null)
    const { axiosInstance } = useAuthContext()

    useEffect(() => {
        if (app && isOpen) {
            setFeedback(app.feedback)
        }


    }, [app, isOpen])


    async function SendFeedback() {
        let info = {
            ...app, feedback
        }

        try {
            let res = await axiosInstance.patch("/scholarship/application", info)
            toast.success("Feedback updated")
            show(null, false)
        } catch (err) {
            console.error(err.response.data.error)
        }

    }



    if (!isOpen) return null;


    console.log(app)

    return (
        <Modal1 isOpen={isOpen} >

            <div className="absolute top-2 right-2 cursor-pointer hover:opacity-70 py-2 px-4 rounded-full" onClick={() => show(null, false)} >
                <ImCross />
            </div>

            <div className="text-lg text-center font-bold text-(--color1)"> Application ID: {app._id} </div>

            <br />

            <div className="font-bold text-(--color1)" >{app.scholarshipDetails.scholarshipName}</div>

            <div>Applicant's Name : {app.applicantName} </div>
            <div> Applicant's Contact: {app.applicantEmail} </div>

            <br />

            <label className="block mb-3">

                <textarea
                    type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring resize-none`}
                    placeholder="Leave your thoughts..."
                    rows={5}
                    required={true}
                />

            </label>

            <div className="flex justify-center gap-4" >
                <button onClick={SendFeedback} className="button-91" >Submit Feedback</button>

            </div>
        </Modal1>)
};


export const useFeedback = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [applicationData, setApplicationData] = React.useState(null);


    let showFeedback = (app, flag) => {
        console.log("show feedback")
        if (app) setApplicationData(app);
        setIsOpen(flag);
    }

    let Tag = () => {
        return <FeedbackTag app={applicationData} show={showFeedback} isOpen={isOpen} />
    }

    return { FeedbackTag: Tag, showFeedback };
}