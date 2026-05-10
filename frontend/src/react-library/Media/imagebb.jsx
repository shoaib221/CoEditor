import React, { useContext } from 'react';
import { AuthContext } from '../auth/context'

export const Imagebb = () => {
    const { axiosInstance } = useContext(AuthContext)

    function UploadImage(e) {
        const image = e.target.files[0];
        const formData = new FormData()

        if (file) {
            formData.append( "image", image );

            axiosInstance.post( `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imagebb}`, formData )
        }
    }

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={UploadImage}
            />
        </div>
    );
};

