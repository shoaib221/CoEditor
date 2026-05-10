import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/react-library/auth/context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { Modal1 } from "@/react-library/Modal/modal";


let UpdateTag1 = ({ isOpen, scholarship, show, refetch }) => {
    const { axiosInstance } = useAuthContext()

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({})

    useEffect(() => {
        if (!scholarship) return;
        reset({ ...scholarship, deadline: new Date(scholarship.deadline).toLocaleDateString() });
    }, [scholarship])


    async function DeleteScholarship() {
        try {
            let res = await axiosInstance.delete(`/scholarship/${scholarship._id}`)
            await refetch();
            toast.info("Successfully Deleted");
            
            show(null, false)
        } catch (err) {
            console.error(err);
        }
    }


    async function UpdateScholarship(data) {
        try {
            let res = await axiosInstance.put(`/scholarship/${scholarship._id}`, data)
            await refetch();
            toast.success("Updated Successfully");
            
            show(null, false);
        } catch (err) {
            console.error(err.response.data.error);
        }
    }



    return (
        <Modal1 isOpen={isOpen} >
                <div className="absolute right-4 top-4 cursor-pointer hover:opacity-70" onClick={() => show(null, false)} >
                    <ImCross />
                </div>
                <br/>

                <div className="text-center text-(--color1) font-bold" > {scholarship?.scholarshipName} </div>
                <br />


                <form noValidate>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">University Name</span>
                        <input
                            type="text"
                            {...register("universityName", { required: "University name is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. Oxford University"
                        />
                        {errors.universityName && <p className="text-(--color5) text-sm mt-1">{errors.universityName.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">Image URL</span>
                        <input
                            type="text"
                            {...register("image", { required: "Image URL is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg  px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. https://example.com/avatar.jpg"
                        />
                        {errors.image && <p className="text-(--color5) text-sm mt-1">{errors.image?.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">Country</span>
                        <input
                            type="text"
                            {...register("country", { required: "Country is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. Argentina"
                        />
                        {errors.country && <p className="text-(--color5) text-sm mt-1">{errors.country.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">City</span>
                        <input
                            type="text"
                            {...register("city", { required: "City is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. Buens Aires"
                        />
                        {errors.city && <p className="text-(--color5) text-sm mt-1">{errors.city.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">World Rank</span>
                        <input
                            type="text"
                            {...register("worldRank", { required: "World Rank is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. 128"
                        />
                        {errors.worldRank && <p className="text-(--color5) text-sm mt-1">{errors.worldRank.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">Subject Category</span>
                        <input
                            type="text"
                            {...register("subjectCategory", { required: "Subject Category is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg  px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. Mathematics"
                        />
                        {errors.subjectCategory && <p className="text-(--color5) text-sm mt-1">{errors.subjectCategory.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">Scholarship Category</span>
                        <input
                            type="text"
                            {...register("scholarshipCategory", { required: "Scholarship category is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. Full-funded"
                        />
                        {errors.scholarshipCategory && <p className="text-(--color5) text-sm mt-1">{errors.scholarshipCategory.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">Degree</span>
                        <input
                            type="text"
                            {...register("degree", { required: "Degree is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. Bachelor's"
                        />
                        {errors.degree && <p className="text-(--color5) text-sm mt-1">{errors.degree.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">Tuition Fees (USD)</span>
                        <input
                            type="number"
                            {...register("tuitionFees", { required: "Tuition fees is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. 1000"
                        />
                        {errors.tuitionFees && <p className="text-(--color5) text-sm mt-1">{errors.tuitionFees?.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">Application Fees (USD)</span>
                        <input
                            type="number"
                            {...register("applicationFees", { required: "Application fees is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. 20"
                        />
                        {errors.applicationFees && <p className="text-(--color5) text-sm mt-1">{errors.applicationFees.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">Service Charge (USD)</span>
                        <input
                            type="number"
                            {...register("serviceCharge", { required: "Service charge is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. 20"
                        />
                        {errors.serviceCharge && <p className="text-(--color5) text-sm mt-1">{errors.serviceCharge.message}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm font-bold">Deadline (DD/MM/YYYY) </span>
                        <input
                            type="text"
                            {...register("deadline", { required: "Deadline is required", minLength: { value: 2, message: "Too short" } })}
                            className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                            placeholder="i.g. 31/12/2026"
                        />
                        {errors.deadline && <p className="text-(--color5) text-sm mt-1">{errors.deadline.message}</p>}
                    </label>


                    <label className="block mb-3">
                        <span className="text-sm font-bold">Description</span>
                        <textarea
                            type="text"
                            {...register("description")}
                            className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring resize-none ${errors.name ? "border-red-500" : ""}`}
                            placeholder="Write about it..."
                            rows={5}
                        />
                        {errors.deadline && <p className="text-(--color5) text-sm mt-1">{errors.deadline.message}</p>}
                    </label>



                    {/* Submit button */}

                </form>

                <div className="flex items-center justify-center gap-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSubmit(UpdateScholarship)}
                        className="font-bold text-(--color1) hover:opacity-70 disabled:opacity-60"
                    >
                        {isSubmitting ? "Updating..." : "Update"}
                    </button>

                    {!isSubmitting &&
                        <button
                            onClick={DeleteScholarship}
                            disabled={isSubmitting}
                            className="font-bold hover:opacity-70 text-(--color1)"
                        >
                            Delete
                        </button>
                    }
                </div>
            </Modal1>
    )

}



export const useUpdateScholarship = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scholarshipData, setScholarshipData] = React.useState(null);


    let showUpdate = (scholarship, flag) => {
        console.log("show update")
        if (scholarship) setScholarshipData(scholarship);
        setIsOpen(flag);
    }


    let Tag = ({ refetch }) => {
        return <UpdateTag1 refetch={refetch} isOpen={isOpen} scholarship={scholarshipData} show={showUpdate} />
    }


    return { UpdateTag: Tag, showUpdate };
}


