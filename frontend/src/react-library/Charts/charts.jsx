import { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const dummyData = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

export const Chart = ({data}) => {


	return (
		<div className='flex-1' >
			<BarChart
				height={300} width={600}
				style={{ aspectRatio: 1.618 }}
				responsive
				data={data}
				margin={{
					top: 5,
					right: 0,
					left: 0,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="1 1" />
				<XAxis dataKey="_id" />
				<YAxis dataKey="students" />
				<Tooltip />
				<Legend />
				<Bar dataKey="_id" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
				<Bar dataKey="students" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
			</BarChart>
		</div>
	);
};



import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useThemeContext } from '../Theme/Theme';

export function PieChart1({ data, isAnimationActive = true, datakey }) {
	const [ color, setColor ] = useState( )
	const [ divider, setDivider ] = useState( )
	const { themeName } = useThemeContext()



	function AdjustTheme () {
		let color4 =  getComputedStyle(document.documentElement).getPropertyValue('--color4').trim()
		let color1 = getComputedStyle(document.documentElement).getPropertyValue('--color1').trim()

		setColor( color4 )
		setDivider( color1 )
	}


	useEffect( () => {
		AdjustTheme()
	}, [themeName] )



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
						stroke={ divider }     
        				strokeWidth={1}      
						label={(entry) => `${entry._id}: ${entry.count}`}
						isAnimationActive={isAnimationActive}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
