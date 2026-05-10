import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './box1.css';
import '../Buttons/button.css';
import { useNavigate } from 'react-router-dom';
import { IoPerson } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";



export const Box11 = ({ job }) => {
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


export const Box12 = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div className='min-h-[20rem] min-w-[15rem] max-w-[15rem] p-2 box-1 flex flex-col justify-between' >
            <div className='font-bold text-lg mb-2' >{job.name} </div>
            <div className='h-[7rem] w-[7rem] p-2  bg-cover bg-center rounded-full mx-auto' style={{ backgroundImage: `url(${job.photo})` }} ></div>
            <div className='text-[.9rem] italic' > {job.description} </div>

        </div>
    )
}

export const Box13 = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div className='min-h-[15rem] p-2 box-1 flex flex-col gap-1 justify-between' >
            <div className='font-bold text-lg mb-2' >{job.name} </div>
            <div title='Visit Live' onClick={() => window.open(job.live, "_blank", "noopener,noreferrer")}
                className='h-[12rem] w-full p-2 border-(--color1) border-2 hover:bg[90%] rounded-lg hover:border-(--color7a) bg-cover bg-center mx-auto' style={{ backgroundImage: `url(${job.photo})` }} ></div>
            <div className='text-[.9rem] italic' > {job.description} </div>

            <button className='button-a mt-2' onClick={() => window.open(job.source, "_blank", "noopener,noreferrer")}>
                Source
            </button>

        </div>
    )
}


export const Box14 = ({ job }) => {
    return (
        <div className='flex  box-shadow-1 flex-col sm:flex-row-reverse p-2 gap-2 w-full max-w-[900px] mx-auto' >

            <div title='Visit Live' onClick={() => window.open(job.live, "_blank", "noopener,noreferrer")}
                className='h-72 sm:h-80 w-full bg-cover bg-top sm:w-[50%] sm:min-w-[50%]' style={{ backgroundImage: `url(${job.photo})` }} ></div>

            <div className='w-full sm:flex-grow flex flex-col items-end justify-center' >
                <div className='font-bold text-lg mb-2' >{job.name} </div>
                <div className='text-[.9rem] italic' > {job.description} </div>

                <button className='button-3 mt-2' onClick={() => window.open(job.source, "_blank", "noopener,noreferrer")}>
                    view
                </button>
            </div>

        </div>
    )
}


export const Box15 = ({ job }) => {
    return (
        <div className='flex  box-shadow-1  flex-col sm:flex-row p-2 gap-2 w-full max-w-[900px] mx-auto' >

            <div title='Visit Live' onClick={() => window.open(job.live, "_blank", "noopener,noreferrer")}
                className='h-72 sm:h-80 w-full sm:w-[50%] bg-cover bg-top sm:min-w-[50%]' style={{ backgroundImage: `url(${job.photo})` }} ></div>

            <div className='w-full sm:flex-grow flex flex-col justify-center' >
                <div className='font-bold text-lg mb-2' >{job.name} </div>
                <div className='text-[.9rem] italic' > {job.description} </div>

                <button className='button-3 mt-2' onClick={() => window.open(job.source, "_blank", "noopener,noreferrer")}>
                    View
                </button>
            </div>

        </div>
    )
}


export const Box16 = ( { data } ) => {
    return (
        <div onClick={ () => window.open( data.link, "_blank", "noopener,noreferrer" ) }
            className='h-40 flex justify-center items-center flex-col cursor-pointer'  >
            <div className='rounded-lg h-12 w-12 bg-cover bg-center mb-2' style={{ backgroundImage: `url(${data.photo})` }} ></div>
            <div className='font-bold hover:underline' >{data.name}</div>
        </div>
    )
}
