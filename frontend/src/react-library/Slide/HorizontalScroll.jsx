

const Story = ({ story }) => {

    return (
        <div className='flex flex-col justify-between px-2 min-w-80 
                        bg-(--color-c4) hover:opacity-80 text-white p-2'  >

            <div className="flex-1 text-justify" >
                {story.comment}
            </div>

            <div className="flex gap-2 items-end" >
                <div  className={`w-18 h-18 rounded-full  bg-cover bg-top`} style={{ backgroundImage: `url(${story.image})` }} />
                <div className="text-sm" >
                    {story.name} <br />
                    {story.scholarship} <br />
                    {story.university}
                </div>
            </div>

        </div>
    )
}


const stories = [
    {
        name: "Ayesha Rahman",
        image: "https://tse1.mm.bing.net/th/id/OIP.cV42tAwuBoNSAYftNEgzXAHaEo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "DAAD Scholarship",
        university: "University of Munich",
        comment:
            "Winning the DAAD Scholarship completely changed my academic journey. The support, resources, and exposure I received helped me grow personally and professionally, opening doors I never thought possible before applying."
    },
    {
        name: "Daniel Kim",
        image: "https://tse3.mm.bing.net/th/id/OIP.i4YH9hPP_yM3nXMIQDDkQwHaLL?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Fulbright Scholarship",
        university: "Harvard University",
        comment:
            "The Fulbright program offered incredible opportunities to collaborate with global researchers. Studying at Harvard allowed me to challenge myself academically and inspired me to pursue meaningful work that impacts communities worldwide."
    },
    {
        name: "Maria Gonzalez",
        image: "https://tse1.mm.bing.net/th/id/OIP.4Gt3RAPOCnNj9enH1r6prAHaI-?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Chevening Scholarship",
        university: "University of Oxford",
        comment:
            "Chevening gave me confidence to push beyond limits. Oxford’s academic environment fostered creativity, leadership, and critical thinking, shaping me into a stronger version of myself ready to take on future challenges."
    },
    {
        name: "Joshua Patel",
        image: "https://tse1.explicit.bing.net/th/id/OIP.Ir31nRT7lfY0caGpkbec3gHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Erasmus Mundus Scholarship",
        university: "University of Barcelona",
        comment:
            "Being an Erasmus scholar allowed me to study across Europe, meet diverse people, and gain knowledge from different cultures. It broadened my worldview and strengthened my passion for international development."
    },
    {
        name: "Hana Yamada",
        image: "https://tse1.explicit.bing.net/th/id/OIP.BH6Si47Nt136YsDmFAFuQwHaEx?cb=ucfimg2&ucfimg=1&w=1280&h=824&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "MEXT Scholarship",
        university: "University of Tokyo",
        comment:
            "The MEXT Scholarship created opportunities I never imagined. Studying at UTokyo challenged me academically and culturally, helping me develop resilience, discipline, and curiosity that shaped my growth as a global learner."
    },
    {
        name: "Kevin Brown",
        image: "https://tse1.mm.bing.net/th/id/OIP.P3GWxhGR9Y_K7_-4K1fGRQHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Commonwealth Scholarship",
        university: "University of Toronto",
        comment:
            "The Commonwealth Scholarship empowered me to pursue research with real-world impact. Toronto’s vibrant academic atmosphere and supportive mentors allowed me to develop new ideas and contribute meaningfully to community-focused projects."
    },
    {
        name: "Fatima Noor",
        image: "https://img.freepik.com/premium-photo/bangladeshi-female-student-black-graduation-gown_606460-87.jpg?w=2000",
        scholarship: "Australia Awards Scholarship",
        university: "University of Melbourne",
        comment:
            "My experience as an Australia Awards scholar was life-changing. Melbourne offered exceptional learning experiences, supportive professors, and global networking opportunities that significantly contributed to my academic and professional growth."
    },
    {
        name: "Liam Anderson",
        image: "https://media.istockphoto.com/id/171299141/photo/englishman.jpg?s=1024x1024&w=is&k=20&c=FtS_bl0R7qNDr4ECv4RFDq895gzplUlM1kWA1Rjmk54=",
        scholarship: "Rhodes Scholarship",
        university: "University of Oxford",
        comment: "Becoming a Rhodes Scholar pushed me to pursue excellence. Oxford’s intellectual environment encouraged deep reflection, meaningful conversations, and personal development, helping me become a more thoughtful and impactful leader."
    }
];


export const ScrollProduct = () => {
    
    return (

        <div className='flex overflow-auto h-96 gap-2' >
            {stories && stories.map((story, index) => <Story key={index} story={story} />)}
        </div>

    )
}


