import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/react-library/auth/context";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { Modal1 } from "@/react-library/Modal/modal";

const EditTag = ({ isOpen, application, show }) => {
    const [education, setEducation] = useState(null)
    const [extras, setExtras] = useState(null)
    const [message, setMessage] = useState(null)
    const { axiosInstance } = useAuthContext()

    useEffect(() => {
        if (!application || !isOpen) return

        setEducation(application.education)
        setExtras(application.extras)
        setMessage(application.message)

    }, [application, isOpen])

    async function Update() {
        if (!education || !extras) {
            toast.info("Fill education & extracurriculars")
            return
        }

        try {
            let res = await axiosInstance.patch("/scholarship/application", { ...application, education, extras, message })
            toast.success("Updated Successfully")
            show(null, false)
            console.log(res.data)
        } catch (err) {
            console.error(err.response.data.error)
        }

    }

    console.log(application)

    if (!application) return null;

    return (
        <Modal1 isOpen={isOpen} >

            <button className="rounded-full absolute top-2 right-2 py-2 px-4 cursor-pointer hover:opacity-80" onClick={() => show(null, false)} >
                <ImCross />
            </button>

            <br />
            <div className="font-bold text-xl text-(--color1) text-center" >Edit Application</div>
            <br />

            <div className="font-bold" > Application ID # {application._id} </div>

            <div className="font-bold" > {application.scholarshipDetails.scholarshipName} </div>





            <label className="block mb-3 mt-2">
                <span className="text-sm font-bold">Eduaction</span>
                <textarea
                    type="text" value={education} onChange={(e) => setEducation(e.target.value)}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring resize-none`}
                    placeholder="Write your hobbies"
                    rows={3}
                />

            </label>

            <label className="block mb-3">
                <span className="text-sm font-bold">Extra Curriculars</span>
                <textarea
                    type="text" value={extras} onChange={(e) => setExtras(e.target.value)}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring resize-none`}
                    placeholder="Write your hobbies"
                    rows={3}
                />

            </label>

            <label className="block mb-3">
                <span className="text-sm font-bold">Message</span>
                <textarea
                    type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring resize-none`}
                    placeholder="Want to add any message?"
                    rows={3}
                />

            </label>

            <div className="flex justify-center gap-4" >
                {application.applicationStatus === 'pending' && <button className="button-91" onClick={Update} >Update</button>}

            </div>
        </Modal1>)
};

export const useEditApplication = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [applicationData, setApplicationData] = React.useState(null);


    let showEdit = (app, flag) => {
        console.log("show edit")
        if (app) setApplicationData(app);
        setIsOpen(flag);
    }

    const Tag = () => {
        return <EditTag isOpen={isOpen} application={applicationData} show={showEdit} />
    }

    return { EditTag: Tag, showEdit };
}