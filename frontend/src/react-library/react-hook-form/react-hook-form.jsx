import React from "react";
import { useForm, Controller } from "react-hook-form";


// single-file React component that demonstrates react-hook-form


export const ReactHookFormExample = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            age: "",
            gender: "male",
            hobbies: [],
            agree: false,
            profile: null,
        },
    });

    const onSubmit = async (data) => {
        // simulate submit delay
        await new Promise((r) => setTimeout(r, 600));

        // file inputs are FileList objects — show the file name if provided
        const profileFile = data.profile && data.profile.length ? data.profile[0].name : null;

        // Normally you'd send `data` to your API here
        alert(JSON.stringify({ ...data, profile: profileFile }, null, 2));

        // reset the form after submit
        reset();
    };

    // watch fields if you want to react to changes
    const watchHobbies = watch("hobbies");

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">React Hook Form — Example</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Name */}
                <label className="block mb-3">
                    <span className="text-sm font-medium">Full name</span>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                {/* Email */}
                <label className="block mb-3">
                    <span className="text-sm font-medium">Email</span>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email address" },
                        })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                </label>

                {/* Password */}
                <label className="block mb-3">
                    <span className="text-sm font-medium">Password</span>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password required",
                            minLength: { value: 6, message: "Minimum 6 characters" },
                        })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        placeholder="••••••"
                    />
                    {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                </label>

                {/* Age (number) */}
                <label className="block mb-3">
                    <span className="text-sm font-medium">Age</span>
                    <input
                        type="number"
                        {...register("age", { valueAsNumber: true, min: { value: 1, message: "Must be at least 1" }, max: { value: 120, message: "Unrealistic age" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.age ? "border-red-500" : "border-gray-300"}`}
                        placeholder="25"
                    />
                    {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>}
                </label>

                {/* Gender (radio) */}
                <fieldset className="mb-3">
                    <legend className="text-sm font-medium mb-1">Gender</legend>
                    <label className="inline-flex items-center mr-4">
                        <input {...register("gender")} type="radio" value="male" className="mr-2" />
                        Male
                    </label>
                    <label className="inline-flex items-center mr-4">
                        <input {...register("gender")} type="radio" value="female" className="mr-2" />
                        Female
                    </label>
                    <label className="inline-flex items-center">
                        <input {...register("gender")} type="radio" value="other" className="mr-2" />
                        Other
                    </label>
                </fieldset>

                {/* Hobbies (checkbox group) */}
                <div className="mb-3">
                    <span className="text-sm font-medium">Hobbies</span>
                    <div className="mt-2 space-x-3">
                        <label className="inline-flex items-center">
                            <input {...register("hobbies")} type="checkbox" value="reading" className="mr-2" />
                            Reading
                        </label>
                        <label className="inline-flex items-center">
                            <input {...register("hobbies")} type="checkbox" value="coding" className="mr-2" />
                            Coding
                        </label>
                        <label className="inline-flex items-center">
                            <input {...register("hobbies")} type="checkbox" value="sports" className="mr-2" />
                            Sports
                        </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Selected: {Array.isArray(watchHobbies) ? watchHobbies.join(", ") : "—"}</p>
                </div>

                {/* Profile photo (file input) using Controller to work with FileList */}
                <label className="block mb-4">
                    <span className="text-sm font-medium">Profile photo</span>
                    <Controller
                        control={control}
                        name="profile"
                        render={({ field }) => (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => field.onChange(e.target.files)}
                                className="mt-1 block w-full"
                            />
                        )}
                    />
                </label>

                {/* Agree checkbox */}
                <label className="inline-flex items-center mb-4">
                    <input {...register("agree", { required: "You must accept the terms" })} type="checkbox" className="mr-2" />
                    <span className="text-sm">I agree to the terms and conditions</span>
                </label>
                {errors.agree && <p className="text-red-600 text-sm mt-1 mb-3">{errors.agree.message}</p>}

                {/* Submit button */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>

                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-3 py-2 rounded-lg border ml-3"
                    >
                        Reset
                    </button>
                </div>
            </form>

            <p className="text-xs text-gray-500 mt-4">This example uses react-hook-form's register, Controller and basic validation. Customize as needed.</p>
        </div>
    );
}
