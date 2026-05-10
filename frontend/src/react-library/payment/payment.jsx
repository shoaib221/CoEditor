import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "@/react-library/auth/context";
import { useEffect, useState } from "react";
import { Loading } from "@/react-library/miscel/Loading"
import { PrivateRoute } from "@/react-library/auth/RestrictedRoutes.jsx";



export const SuccesfulPayment = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const { axiosInstance, user } = useAuthContext()
    const navigate = useNavigate()
    const [application, setApplication] = useState(null)

    const FetchPaymentInfo = async () => {
        try {
            let res = await axiosInstance.post("/scholarship/payment-success", { session_id: sessionId })
            console.log(res.data);
            setApplication(res.data.application);
        } catch (err) {
            console.error(err.response.data.error)
        }
    }

    useEffect(() => {
        if (!sessionId || !user) return;
        FetchPaymentInfo()
    }, [sessionId, axiosInstance, user])

    if (!application) return <Loading />

    return (
        <PrivateRoute>
        <div className="w-full mx-auto flex flex-col lg:flex-row gap-4" >


            <div className='mb-8 lg:min-w-[32rem] lg:max-w-[32rem] relative h-72 lg:h-90 w-full rounded-lg bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${application.scholarshipDetails.image})` }} >
                <img src="/green-tick.webp" className="h-24 absolute -bottom-10 right-[42%]" />
            </div>




            <div className="flex-grow" >


                <div className="text-green-800 text-2xl font-bold" >Payment Successful</div>


                <div> Paid Amount: <span className="font-bold" > {application.paymentAmount} </span>  USD  </div>
                <div>Transaction Reference: <span className="font-bold" > {application.transId} </span> </div>
                <div> Application ID: <span className="font-bold" > {application._id} </span> </div>
                <br />
                <div className="font-bold text-lg" > {application.scholarshipDetails.scholarshipName}
                    <span className="text-sm font-normal"> {application.scholarshipDetails.scholarshipCategory} </span>

                </div>

                <div>
                    {application.scholarshipDetails.degree} in {application.scholarshipDetails.subjectCategory}
                </div>

                <div> {application.scholarshipDetails.universityName} </div>
                <div> {application.scholarshipDetails.city}, {application.scholarshipDetails.country} </div>

                <br />
                <div className="font-bold text-lg" >Applicant</div>
                <div> {application.applicantName} </div>
                <div className="text-gray-600" > {application.applicantEmail} </div>
                <br />

                <button className="button-91" onClick={() => navigate("/dashboard?board=my-apps")} >My Applications</button>

            </div>
        </div>
        </PrivateRoute>
    )
}


export const FailedPayment = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const { axiosInstance, user } = useAuthContext()
    const navigate = useNavigate()
    const [application, setApplication] = useState(null)
    const [status, setStatus] = useState(null)

    const FetchPaymentInfo = async () => {
        try {
            let res = await axiosInstance.post("/scholarship/payment-success", { session_id: sessionId })
            console.log(res.data);
            setApplication(res.data.application);
            setStatus(res.data.status)
        } catch (err) {
            console.error(err.response.data.error)
        }
    }

    useEffect(() => {
        if (!sessionId || !user) return;
        FetchPaymentInfo()
    }, [sessionId, axiosInstance, user])

    if (!application) return <Loading />

    return (
        <PrivateRoute>
        <div className="w-full mx-auto flex flex-col lg:flex-row gap-4" >

            <div className='mb-8 lg:min-w-[32rem] lg:max-w-[32rem] relative h-72 lg:h-90 w-full rounded-lg bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${application.scholarshipDetails.image})` }} >
                <img src="/red-cross.jpg" className="h-24 absolute -bottom-10 right-[42%]" />
            </div>

            <div className="flex-grow" >

                <div className="text-red-800 font-bold text-2xl" >Payment Failed</div>
                {/* <div>Status: { status }</div> */}
                <div> Payable Amount: <span className="font-bold" > {application.paymentAmount} </span> USD  </div>
                <div> Application ID: <span className="font-bold" > {application._id} </span> </div>


                <br />
                <div className="font-bold text-lg" >Scholarship</div>
                <div> {application.scholarshipDetails.scholarshipName} </div>
                <div> {application.scholarshipDetails.universityName} </div>
                <div> {application.scholarshipDetails.city}, {application.scholarshipDetails.country} </div>

                <br />
                <div className="font-bold text-lg" >Applicant</div>
                <div> {application.applicantName} </div>
                <div className="text-gray-600" > {application.applicantEmail} </div>
                <br />

                <button className="button-2" onClick={() => navigate("/dashboard")} >Dashboard</button>

            </div>
        </div>
        </PrivateRoute>
    )
}