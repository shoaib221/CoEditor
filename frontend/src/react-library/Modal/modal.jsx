
import React from 'react';
import '../Buttons/button.jsx';



export const Modal = () => {

    function ShowModal(modal_id, open) {
        let elem = document.getElementById(modal_id)
        if (open) {
            elem.classList.remove('hidden')
            elem.classList.add('flex')
        }
        else {
            elem.classList.remove('flex')
            elem.classList.add('hidden')
        }
    }


    return (
        <>
            <button onClick={() => ShowModal("modal-1", 1)} >
                Click
            </button>

            <div id="modal-1" className='fixed top-0 left-0 w-[100vw] h-[100vh] hidden flex-col justify-center items-center bg-[var(--color-blur)] z-3' >
                <div className='w-[100%] h-[100%] max-w-[600px] max-h-[600px] bg-[#ffffff] p-4' >
                    <div className='w-[100%] h-[40%] bg-cover bg-center' style={{ backgroundImage: `url(/logo1.jpg)` }}  ></div>
                    <div className='text-3xl font-bold text-center' >Title</div>
                    <div className='text-center' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione assumenda tempore delectus iste quis, repellat excepturi vel maxime molestias amet reiciendis saepe quibusdam praesentium accusantium voluptatum laudantium necessitatibus beatae? Tenetur quasi aut velit eligendi voluptatibus illo obcaecati, aliquam laudantium, cumque hic, sit magnam blanditiis ipsam quidem molestias dolor. Accusamus at enim, minima, nihil quasi provident doloribus velit ipsa vitae iure deleniti fuga saepe? Quos voluptatum vitae repellendus quisquam aliquam dolor explicabo? Neque quasi laudantium eaque repudiandae, pariatur distinctio tenetur, alias fugiat sapiente dolorum labore dolor ea odit ipsa illum modi, vero earum et. Alias nemo libero sed. Beatae, a mollitia.</div>
                    <div className='text-center button-1' onClick={() => ShowModal("modal-1", 0)} >Close</div>
                </div>
            </div>
        </>
    );
};


export const Modal1 = ( { isOpen, children } ) => {

    return (
        <div
            className={`
                ${isOpen ? "block" : "hidden"}
                inset-0 overflow-auto p-4
                fixed 
                z-70 
                bg-black/40
            `}
        >
            <div className="w-full mx-auto max-w-140 bg-(--color4) text-(--color1a) relative p-4 rounded-lg" >
                {children}
            </div>
        </div>
    )
}

