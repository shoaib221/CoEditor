import { updateProfile } from "firebase/auth";
import { auth } from './firebase.config';
import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "./context";
import { Loading } from "../miscel/Loading";
import { NotFound } from "../miscel/NotFound";
import { data, Navigate, useLocation } from "react-router-dom";
import { Grid, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { PrivateRoute } from "./RestrictedRoutes";
import { FaRegSmile } from "react-icons/fa";
import axios from "axios";
import { uploadToCloudinary } from "../Media/cloudinary_upload";
import { usePagination11, PageTag, SearchTag } from "../pagination/pagination1";
import { Label } from "recharts";

function Users() {
    const { data, loading, page, pages, setPage, searchBy, setSearchBy, searchFor, setSearchFor, fetchData } = usePagination11({ url: "/chat/users" });

    const searchParams = [
        { value: 'friend', label: "Friends" },
        { value: 'others', label: "Others" }
    ]


    return (
        <div>

            <SearchTag searchFor={searchFor} searchBy={searchBy} setSearchBy={setSearchBy} setSearchFor={setSearchFor} searchParams={searchParams} fetchData={fetchData} />

            {data && data.length > 0 && data.map((elem, i) => (
                <div key={i}  >
                    {elem.id}
                </div>
            ))}

            <PageTag page={page} pages={pages} setPage={setPage} loading={loading} data={data} />


        </div>
    )



}


export const UpdateProfile = () => {
    const { user, loading, setUser } = useAuthContext();
    
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [profession, setProfession] = useState("");
    const [location, setLocation] = useState("");
    const [contact, setContact] = useState("");


    const [photo, setPhoto] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const { axiosInstance } = useAuthContext();
    




    useEffect(() => {
        if (!user) return;
        //console.log(user)
        setName(user.name);
        setPhoto(user.photo);
        setNumber(user.phoneNumber);
        setEmail(user.email);
        setBio(user.bio);
        setProfession(user.profession);
        setLocation(user.location);
        setContact(user.contact);
    }, [user])


    async function Update() {
        try {
            const updation = { name, bio, profession, location, contact };

            if (imageFile) {


                const imageURL = await uploadToCloudinary(imageFile, "image")


                setPhoto(imageURL);
                updation.photo = imageURL;
            }



            // Update Firebase profile
            await updateProfile(auth.currentUser, updation);
            await axiosInstance.post("/auth/profile", updation);

            toast.success("Profile Updated Successfully");
            console.log("Updated profile:", updation);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        }
    }

    const imageChange = (event) => {
        let file = event.target.files[0];

        if (file) {
            setImageFile(file)
            let url = URL.createObjectURL(file)
            setPhoto(url)
        }
    }


    return (
        <PrivateRoute>
            <div className="flex flex-col lg:flex-row  grow p-2 gap-4" >

                <div className="lg:sticky lg:top-20 px-4 lg:self-start" >

                    <div className="rounded-full bg-cover bg-center h-60 w-60 min-w-60 relative border-2 border-(--color4) mx-auto"
                        style={{ backgroundImage: `url(${photo})` }} >

                        <div className="rounded-full bg-[var(--color1)] absolute top-[75%] right-2 cursor-pointer" >
                            <FaRegSmile title="upload image" className="text-2xl" />
                            <input type="file" onChange={imageChange} className="opacity-0 absolute top-0 left-0 h-full w-full" />
                        </div>


                    </div>
                    <br/>

                    <div className="text-center" > {user?.email} </div>

                </div>




                <div className="lg:p-2 flex flex-col items-center lg:items-baseline lg:grow" >

                    <div className="header-13" >Name</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="input-11" />
                    <br />

                    <div className="header-13" >Bio</div>
                    <textarea rows={3} type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Your Bio" className="input-11 no-scrollbar" />
                    <br />

                    <div className="header-13" >Profession</div>
                    <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} placeholder="Your Profession" className="input-11 no-scrollbar" />
                    <br />

                    <div className="header-13" >Location</div>
                    <textarea rows={3} type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Your Location" className="input-11 no-scrollbar" />
                    <br />

                    <div className="header-13" >Contact</div>
                    <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Your Contact" className="input-11 no-scrollbar" />
                    <br />

                    <button onClick={Update} className="button-2 border px-8 mx-8"  >Update</button>

                </div>


            </div>
        </PrivateRoute>
    )
}

// displayName, email, emailVerified,
// metadata, phoneNumber, photoURL

export const UpdateProfileED2 = () => {

    return (
        <></>
    )
}