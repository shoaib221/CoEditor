import React, { useState } from "react";
import { useAuthContext } from "@/react-library/auth/context";
import { set } from "react-hook-form";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { Button3 } from "@/react-library/Buttons/button";
import { Modal1 } from "@/react-library/Modal/modal";



let DetailTag = ({ application, show, showDetail, refetch }) => {
    const { axiosInstance } = useAuthContext()

    async function DeleteAopplication() {
        try {
            let res = await axiosInstance.delete(`/scholarship/application/${application._id}`);
            toast.info("Deleted Succesfully")

            // await refetch()
            showDetail(null, false)
        } catch (error) {
            console.error("Error deleting application:", error);
        }
    }


    const Pay = async () => {
        let info = {
            applicationId: application._id,
        }

        console.log("Checkout info:", info);

        try {
            let response = await axiosInstance.post('/scholarship/apply', info);
            showDetail(null, false);
            window.location.href = response.data.url;
        } catch (err) {
            console.error("Checkout error:", err);
        }
    }

    if (!application) return null;

    return (
        <Modal1 isOpen={show} >

            <button onClick={() => showDetail(null, false)} className="rounded-full absolute top-2 right-2 py-2 px-4 cursor-pointer hover:opacity-80" >
                <ImCross />
            </button>

            <br />

            <div className="text-xl text-(--color1) text-center font-bold" >Application Detail</div>
            <br />

            <div className="font-bold text-(--color1)" >
                Application ID # {application._id}
            </div>

            <div className="font-bold text-(--color1)"     >

                {application.scholarshipDetails.scholarshipName}
                <span className="text-sm font-normal ml-2" >( {application.scholarshipDetails.scholarshipCategory} )</span>

            </div>

            <div>
                <span className="font-bold" >{application.scholarshipDetails.degree}</span> in
                <span className="font-bold" > {application.scholarshipDetails.subjectCategory} </span>
            </div>

            <div>
                <span className="font-bold" >{application.scholarshipDetails.universityName}</span>

            </div>
            <div>

                {application.scholarshipDetails.city},  {application.scholarshipDetails.country}
            </div>





            <br />

            <div className="font-bold text-(--color1)" >Applicant's Detail</div>
            <div>
                <span className="font-bold" > Name :  </span>
                {application.applicantName}
            </div>

            <div>
                <span className="font-bold" > Contact :  </span>
                {application.applicantEmail}
            </div>

            <div>
                <div className="font-bold" >Education : </div>
                <div>
                    {application.education ? application.education : "No data available"}
                </div>
            </div>

            <div>
                <div className="font-bold" >Extracurriculars : </div>
                <div>
                    {application.extras ? application.extras : "No data available"}
                </div>
            </div>


            <div>
                <div className="font-bold" >Message : </div>
                <div>
                    {application.message ? application.message : "No message available"}
                </div>
            </div>

            <br />


            <div className="font-bold text-(--color1)" >Payments</div>

            <div>
                <span className="font-bold" >Tuition Fees:  </span>
                {application.scholarshipDetails.tuitionFees} USD
            </div>


            <div>
                <span className="font-bold" >Application Fees: </span>
                {application.scholarshipDetails.applicationFees} USD
            </div>

            <div>
                <span className="font-bold" > Service Charge: </span>
                {application.scholarshipDetails.serviceCharge} USD
            </div>

            <div>
                <span className="font-bold" > Payable Amount : </span>
                {application.scholarshipDetails.applicationFees + application.scholarshipDetails.serviceCharge} USD
            </div>

            <br />

            <div className="font-bold text-(--color1)" >Status</div>

            <div>
                <span className="font-bold" >Application Status: </span>
                {application.applicationStatus}
            </div>

            <div>
                <span className="font-bold" >Payment Status: </span>
                {application.paymentStatus}
            </div>
            <br />

            <div className="font-bold text-(--color1)" >Feedback</div>
            <div>
                {application.feedback ? application.feedback : "No feedback yet"}
            </div>

            <br />

            <div className="flex justify-center gap-4" >
                {application.paymentStatus === 'unpaid' && <button onClick={Pay} className="button-91" >Pay</button>}
                {application.applicationStatus === 'pending' && <button className="button-91" onClick={DeleteAopplication}  >Delete</button>}


            </div>

        </Modal1>)
}


export const useDetailApplication = () => {
    // Hook logic here

    const [show, setShow] = React.useState(false);
    const [application, setApplication] = React.useState(null);
    const [refetch, setRefetch] = useState(null)


    let showDetail = (app, flag, refetch) => {
        if (app) setApplication(app);
        console.log(app)
        setShow(flag)
        setRefetch(refetch)
    }

    const Tag = () => {
        return <DetailTag show={show} showDetail={showDetail} application={application} refetch={refetch} />
    }


    return { DetailTag: Tag, showDetail };
}