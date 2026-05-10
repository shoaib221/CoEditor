import { useForm, Controller } from "react-hook-form";
import { useAuthContext } from "@/react-library/auth/context";
import { useMyImage } from "@/react-library/Media/image";
import { Button4 } from "@/react-library/Buttons/button";


export const AddScholarship = () => {
    const { axiosInstance } = useAuthContext();
    const { PhotoTag, uploadPhoto } = useMyImage({}); 

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            scholarshipName: "",
            universityName: "",
            image: "",
            country: "",
            city: "",
            worldRank: "",
            subjectCategory: "",
            scholarshipCategory: "",
            degree: "",
            tuitionFees: "",
            applicationFees: "",
            serviceCharge: "",
            deadline: "",
        },
    });

    const onSubmit = async (data) => {
        let image = await uploadPhoto();
        data.image = image;
        try {
            let res = await axiosInstance.post("/scholarship/add", data)

            console.log(res.data)
            reset();
        } catch (err) {
            console.error(err);
        }
        // reset the form after submit
    };

    // watch fields if you want to react to changes
    // const watchHobbies = watch("hobbies");

    return (
        <div className="max-w-xl p-6 rounded-lg">
            <div className="text-xl text-(--color4) font-bold text-center" >
                Add New Scholarship
            </div>
            <br/>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <PhotoTag />
                <br/>

                {/* Name */}
                <label className="block mb-3">
                    <span className="font-bold">Scholarship Name</span>
                    <input
                        type="text"
                        {...register("scholarshipName", { required: "Scholarship name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. Fullbright Scholarship"
                    />
                    {errors.scholarshipName && <p className="text-(--color5) text-sm mt-1">{errors.scholarshipName?.message}</p>}
                </label>


                <label className="block mb-3">
                    <span className="font-bold" >University Name</span>
                    <input
                        type="text"
                        {...register("universityName", { required: "University name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. Oxford University"
                    />
                    {errors.universityName && <p className="text-(--color5) text-sm mt-1">{errors.universityName.message}</p>}
                </label>

                

                <label className="block mb-3">
                    <span className="font-bold" > Country</span>
                    <input
                        type="text"
                        {...register("country", { required: "Country is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. Argentina"
                    />
                    {errors.country && <p className="text-(--color5) text-sm mt-1">{errors.country.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="font-bold" >City</span>
                    <input
                        type="text"
                        {...register("city", { required: "City is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. Buens Aires"
                    />
                    {errors.city && <p className="text-(--color5) text-sm mt-1">{errors.city.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="font-bold" >World Rank</span>
                    <input
                        type="number"
                        {...register("worldRank", { required: "World Rank is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. 128"
                    />
                    {errors.worldRank && <p className="text-(--color5) text-sm mt-1">{errors.worldRank.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="font-bold" >Subject Category</span>
                    <input
                        type="text"
                        {...register("subjectCategory", { required: "Subject Category is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. Mathematics"
                    />
                    {errors.subjectCategory && <p className="text-(--color5) text-sm mt-1">{errors.subjectCategory.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="font-bold" >Scholarship Category</span>
                    <input
                        type="text"
                        {...register("scholarshipCategory", { required: "Scholarship category is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. Full-funded"
                    />
                    {errors.scholarshipCategory && <p className="text-(--color5) text-sm mt-1">{errors.scholarshipCategory.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="font-bold" >Degree</span>
                    <input
                        type="text"
                        {...register("degree", { required: "Degree is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. Bachelor's"
                    />
                    {errors.degree && <p className="text-(--color5) text-sm mt-1">{errors.degree.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="font-bold" >Tuition Fees (USD)</span>
                    <input
                        type="number"
                        {...register("tuitionFees", { required: "Tuition fees is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. 1000"
                    />
                    {errors.tuitionFees && <p className="text-(--color5) text-sm mt-1">{errors.tuitionFees.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="font-bold" >Application Fees (USD)</span>
                    <input
                        type="number"
                        {...register("applicationFees", { required: "Application fees is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg  px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. 20"
                    />
                    {errors.applicationFees && <p className="text-(--color5) text-sm mt-1">{errors.applicationFees.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="font-bold" >Service Charge (USD)</span>
                    <input
                        type="number"
                        {...register("serviceCharge", { required: "Service charge is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. 20"
                    />
                    {errors.serviceCharge && <p className="text-(--color5) text-sm mt-1">{errors.serviceCharge.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="font-bold" >Deadline (DD/MM/YYYY) </span>
                    <input
                        type="text"
                        {...register("deadline", { required: "Deadline is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : ""}`}
                        placeholder="i.g. 31/12/2026"
                    />
                    {errors.deadline && <p className="text-(--color5) text-sm mt-1">{errors.deadline.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="font-bold" >Description</span>
                    <textarea
                        type="text"
                        {...register("description", { required: "Description is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring resize-none ${errors.name ? "border-red-500" : ""}`}
                        placeholder="Write about it..."
                        rows={5}
                    />
                    {errors.description && <p className="text-(--color5) text-sm mt-1">{errors.description.message}</p>}
                </label>



                {/* Submit button */}
                
                    <Button4
                        type="submit"
                        disabled={isSubmitting}
                        
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button4>


                
            </form>

        </div>
    );



}