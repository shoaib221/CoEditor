import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './box.css';
import { useNavigate } from 'react-router-dom';
import { IoPerson } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";



export const Box = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div className='h-[15rem] p-2 box-1' >
            <div className='w-full h-[7rem] bg-cover bg-center' style={{ backgroundImage: `url(${job.coverImage})` }} >  </div>
            <div className='font-bold' >{job.title} </div>
            <div className='text-[.8rem] italic' > {job.summary.substring(0, 80)} ...</div>
            <div className='flex text-[.7rem] justify-between' >
                <div className='flex gap-1 items-center' > <IoPerson /> {job.postedBy} </div>
                <div className='flex gap-1 items-center' > {job.category} <BiCategory /> </div>
            </div>
            <button className='button-1' onClick={() => navigate(`/job-detail/${job._id}`)} >
                View Detail
            </button>
        </div>
    )
}
