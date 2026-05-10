import { useEffect, useState } from "react";
import { useAuthContext } from "@/react-library/auth/context"


import { Loading } from "@/react-library/miscel/Loading";

// #region Sample data


import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { PieChart1 } from "@/react-library/Charts/charts";



function Pie2({ data, isAnimationActive = true, datakey }) {
    
    let color1 =  getComputedStyle(document.documentElement).getPropertyValue('--color4').trim()
    const [ color, setColor ] = useState( color1 )

    return (
        <div className="h-120 w-full sm:h-135 max-w-120 mx-auto" >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="count"
                        startAngle={90}
                        endAngle={270}
                        data={data}
                        cx="100%"
                        cy="50%"
                        outerRadius="80%"
                        fill={color}
                        label={(entry) => `${entry._id}: ${entry.count}`}
                        isAnimationActive={isAnimationActive}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}




export const Analytics = () => {
    const { axiosInstance, user } = useAuthContext();
    const [analytics, setAnalytics] = useState(null);


    async function Fetch() {
        console.log("analytics")
        try {
            let res = await axiosInstance.get("/scholarship/analytics");
            setAnalytics(res.data)
            console.log(res.data)
            console.log(res.data.feesDistribution[0].count)


            console.log("here")
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (!user) return;
        Fetch();
    }, [user])

    if(!analytics) return <Loading />

    return (
        <div  className="" >


            <div className="text-xl font-bold text-(--color4) text-center" >Users  </div>
            {analytics && <PieChart1 data={analytics?.usersByCategory} />}
            <div className="text-center font-bold" > Total: {analytics?.totalUsers} </div>

            <br /> <br /> <br />
            <div className="text-xl font-bold text-(--color4) text-center" >Scholarships  </div>
            <br />
            {analytics && <PieChart1 data={analytics?.scholarshipPerSubject} />}
            <br />
            <div className="text-center font-bold" > Total {analytics?.totalScholarships} </div>



            <br /> <br />
            <div className="text-xl font-bold text-(--color4) text-center" >Fees Collected:  </div>


            {analytics && <PieChart1 data={analytics?.feesDistribution} />}
            <div className="text-center font-bold" > Total: ${analytics?.totalReceivedMoney} </div>


            <br /> <br />
            <div className="text-xl font-bold text-(--color4) text-center" >Approved Applications</div>
            {analytics && <PieChart1 data={analytics?.appPerScholarshipCat} />}
            <div className="text-center font-bold"> Total {analytics?.totalApplications} </div>

            <br /> <br /><br/>

            <div className="text-xl font-bold text-(--color4) text-center" >Approved Application Per University</div>

            <div className=" justify-between p-8 max-w-[800px] mb-4 mx-auto grid grid-cols-[1fr_1fr] gap-4" >
                <div className="font-bold box-1212  text-center" >University Name</div>
                <div className="font-bold box-1212 text-center" >Number of Applications</div>

                {analytics && analytics.appPerUniversity.map((elem, index) => (
                    <>
                        <div className="box-1212 text-center" > {elem._id} </div>
                        <div className="box-1212 text-center" > {elem.count} </div>
                    </>
                ))}
            </div>



        </div>
    )
}