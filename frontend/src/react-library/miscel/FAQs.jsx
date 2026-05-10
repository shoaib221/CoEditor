import { useState } from "react"


const qas = [
    {
        question: "How do I find scholarships that match my profile?",
        answer: "Use our smart filters to search by country, degree level, GPA, subject, and funding type. Our algorithm recommends scholarships based on your profile."
    },
    {
        question: "Is applying for scholarships on this website free?",
        answer: "Yes, browsing and applying for scholarships is completely free. We do not charge users for searching or submitting applications."
    },
    {
        question: "How can I increase my chances of winning a scholarship?",
        answer: "Complete your profile, upload strong recommendation letters, and apply early. Our platform also offers tips on writing effective motivation letters."
    },
    {
        question: "How do I know if a scholarship is legitimate?",
        answer: "We verify every scholarship before posting it. Each listing includes details about the provider, eligibility requirements, benefits, and deadlines."
    },
    {
        question: "Can I track the status of my scholarship applications?",
        answer: "Yes, you can track all your submitted applications in the dashboard. You’ll receive email and in-app notifications when your application status changes."
    }
];


export const FAQs = () => {


    const [ques, setQues] = useState(-1);

    const ToggleFunction = (ind) => {
        if (ques === ind) setQues(-1);
        else setQues(ind);
    }

    return (
        <div>
            <div className='header-12' >Frequently Asked Questions</div>
            <div className="w-full max-w-[800px] mx-auto flex flex-col gap-4" >
                {qas && qas.map((elem, index) => (
                    <div key={index} onClick={() => ToggleFunction(index)}  >
                        <div className="flex justify-between gap-4 cursor-pointer" >
                            <span className="text-(--color4)" > {elem.question} </span>
                            <button > {index === ques ? "-" : "+"} </button>
                        </div>
                        {ques === index &&
                            <div className="px-2 text-(--color2)" > {elem.answer} </div>
                        }
                    </div>
                ))}
            </div>
        </div>


    )
}