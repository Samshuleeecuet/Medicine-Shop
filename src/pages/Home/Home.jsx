import React, { useState } from 'react';
import useFindMedicine from '../../hooks/useFindMedicine/useFindMedicine';
import useMedicineStore from '../../hooks/useMedicineStore/useMedicineStore';
const Home = () => {
    const [searchvalue,setSearchvalue] = useState(null);
    const [SearchMedicine] = useFindMedicine(searchvalue)
    const [,refetch,] = useMedicineStore()
    const handleChange =(e)=>{
        setSearchvalue(e.target.value)
    }
    console.log(SearchMedicine)
    const handleLight = (medicine)=>{
        console.log(medicine.bulb)
        if(medicine.bulb === 'off'){
            const status = 'on'
            const data = {id: medicine.medicineId,status}
            fetch('http://localhost:5000/bulb',{
                    method: 'POST',
                        headers:{
                          'content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                })
                .then(res=> res.json())
                .then(result=>{

                })
        }
        if(medicine.bulb === 'on'){
            const status = 'off'
            const data = {id: medicine.medicineId,status}
            fetch('http://localhost:5000/bulb',{
                    method: 'POST',
                        headers:{
                          'content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                })
                .then(res=> res.json())
                .then(result=>{
                    refetch()
                })
        }

    }
    return (
        <div>
            <div className='mx-auto w-96 my-6'>
            <input onChange={handleChange} type="text" placeholder="Type Medicine Name or Generic" className="input input-bordered input-secondary w-full max-w-xs mr-2" />
            </div>
            {
                SearchMedicine.length<1 && <p className='text-2xl text-center font-serif font-bold text-red-700 pt-10'>Medicine Not Found</p>
            }
            {
             SearchMedicine.length>0 &&  <div className=''>
            <div className="overflow-x-auto lg:w-2/3 mx-auto">
            <table className="table">
                <thead>
                <tr className='bg-gray-400/40 text-black'>
                  <th>Id</th>
                    <th>Name | Type<br/><span className='text-gray-800/50'>Generic</span></th>
                    <th>Company</th>
                    <th>Price</th>
                    <th>Avalaible<br/> Quantity</th>
                    <th>Box<br/> Number</th>
                    <th>Expire<br/> Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {
                    SearchMedicine.map(item=> <tr key={item.medicineId}>
                        <td>
                            {item.medicineId}
                        </td>
                        <td>
                        <div className="flex items-center space-x-3">                         
                        <div>
                            <div className="font-bold">{item.medicineName} | {item.type}</div>
                            <span className="badge badge-secondary ">{item.genericName}</span>
                        </div>
                        </div>
                        </td>
                        <td>
                        {item.companyName}
                        </td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.box}</td>
                        <td>{item.expiredate}</td>
                        <th>
                            {
                                item.bulb === 'off' && <button onClick={()=>handleLight(item)} className="btn btn-ghost btn-xs">Turn On</button>
                            }
                            {
                                item.bulb === 'on' && <button onClick={()=>handleLight(item)} className="btn btn-ghost btn-xs">Turn off</button>
                            }
                        
                        </th>
                    </tr> )
                }     
                </tbody>
            </table>
            </div>
            </div>
            }
        </div>
    );
};

export default Home;