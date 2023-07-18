import React from 'react';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { AuthContext } from '../../provider/AuthProvider';

const EntryReport = () => {
    const {user,loading} = useContext(AuthContext)
    const token= localStorage.getItem("access-token")
    const {data: EntryReport = [],refetch,EntryReportLoading} = useQuery({
        queryKey:["EntryReport"],
        queryFn: async ()=>{
            const response = await fetch(`http://localhost:5000/reportbyentrydate`);
            return response.json()
        }
    })
    

    return (
        <div>
            <h1 className='pb-6 text-xl font-bold mb-8 text-center font-serif'>Last 7 days Entry Report</h1>
        <LineChart
          width={500}
          height={300}
          data={EntryReport}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" >
          <Label value="Date" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis label={{ value: 'Number of Entries', angle: -90, position: 'Left' }}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="length" stroke="#8884d8" activeDot={{ r: 10 }} />
        </LineChart>
        </div>
    );
};

export default EntryReport;