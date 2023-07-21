import React, { useEffect, useState } from 'react';
import useMedicineStore from '../../hooks/useMedicineStore/useMedicineStore';
import moment from 'moment';


const MedicineStore = () => {
    const [isMedicines] = useMedicineStore()
    const [isExpire, setExpire] = useState(false)
    console.log(isMedicines)
    let expired = []
    let expiredSoon = []
    let exp ;
    let totalQuantity = 0;
    // useEffect(()=>{
    //     const interval = setInterval(()=>{
    //         setExpire(!isExpire)
    //     })
    // },[isExpire])

    const lightStyle = {
        backgroundColor: isExpire ? 'red' : 'gray', // Change this to the color you want.
      };

    return (
        <div className='pt-10'>
            <div>
                <h1 className='pb-6 text-2xl font-bold mb-8 text-center font-serif'>Medicine Info</h1>
            </div>
            <div className='flex'>
                <div className="overflow-x-auto w-full mx-auto">
            <table className="table">
                <thead>
                <tr className=' bg-gray-400/40 text-black'>
                    <th>Id</th>
                    <th>Name | Type<br/><span className='text-gray-800/50'>Generic</span></th>
                    <th>Company</th>
                    <th>Batch No</th>
                    <th>Price</th>
                    <th>Avalaible<br/> Quantity</th>
                    <th>Expire<br/> Date</th>
                    <th>Box<br/> Number</th>
                    <th>Entry<br/> Date</th>
                    <th>Available</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {
                    isMedicines && isMedicines.map((item)=> <tr key={item.medicineId} className='text-xs'>
                    <td>
                        {item.medicineId}
                    </td>
                    <td>
                    <div className="flex items-center space-x-3">                         
                    <div>
                        <div className="font-bold">{item.medicineName} | {item.type}</div>
                        <span className="badge badge-secondary text-xs">{item.genericName}</span>
                    </div>
                    </div>
                    </td>
                    <td>
                    {item.companyName}
                    </td>
                    <th>
                        {
                            item.medicines.map((medicine,index)=>{
                                return <p key={index}>{medicine.batchNumber}</p>
                            })
                        }
                    </th>
                    <td>
                        <p>{item.medicines[item.medicines.length-1].price}</p>
                    </td>
                    <td>
                       {
                            item.medicines.map((medicine,index)=>{
                                return <p key={index}>{medicine.quantity}</p>
                            })
                        }
                    </td>
                    <td>
                    {
                            item.medicines.map((medicine,index)=>{
                                return <p key={index}>{medicine.expiredate}</p>
                            })
                    }
                    </td>
                    <td>{item.box}</td>
                    <td>
                        {
                            item.medicines.map((medicine,index)=>{
                                return <p key={index}>{medicine.entrydate}</p>
                            })
                        }
                    </td>
                    <th>
                        <p className='hidden'>
                        {
                             totalQuantity = item.medicines.reduce(function(a,b){ return a+parseInt(b.quantity)},0)
        
                        }</p>

                           
                        {
                            totalQuantity>30 && <p className='btn btn-xs  bg-green-400/90 hover:bg-green-400/90 text-white'>In Stock</p>
                        }  
                        {
                            (totalQuantity<30 && totalQuantity>0) && <p className='btn btn-xs  bg-yellow-400/90 hover:bg-yellow-400/90 text-white'>In Stock</p>
                        } 
                        {
                            totalQuantity == 0 && <p className='btn btn-xs  bg-red-700/90 hover:bg-red-700/90 text-white'>Out of Stock Stock</p>
                        }                  
                    </th>
                    <th key={item.medicineId}>
                        {
                            item.medicines.map((batch,index)=>{
                                exp = moment(batch.expiredate,'DD-MM-YYYY').fromNow()
                                // console.log(exp)
                                // console.log(exp.includes('days'&& 'in'))
                                if(exp.includes('ago')){
                                    batch.box= item.box
                                    batch.medicineName = item.medicineName
                                    expired.push(batch)
                                    return <><p className='btn btn-xs bg-red-700/90 hover:bg-red-700/90 text-white'>Expired</p><br/></>
                                }

                                if(exp.includes('months') || exp.includes('month')){
                                    return <><p className='btn btn-xs bg-green-400/90 hover:bg-green-400/90 text-white'>Expired {exp}</p><br/></>
                                }
                                
                                if(exp.includes('days')){
                                    expiredSoon.push(batch)
                                    return <><p className='btn btn-xs bg-yellow-400/90 hover:bg-yellow-400/90 text-white'>Expired {exp}</p><br/></>
                                }
                                
                            })
                        }
                    </th>
                </tr>
                )}    
                </tbody>
            </table>
            </div>
            <div className='gap-4'>

            <div className='flex flex-col justify-center items-center'>
            <div className='h-20 w-20 rounded-full flex flex-col items-center font-semibold text-white justify-center' style={lightStyle}>
                <p>Expired</p>
            </div>
            <div className='mt-10'>
                
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Batch No.</th>
        <th>Box No.</th>
      </tr>
    </thead>
    <tbody>
      {
        expired && expired.map((item,index)=> <tr key={index} className='text-xs'>
                    <td>{item.medicineName}</td>
                    <td>{item.batchNumber}</td>
                    <td>{item.box}</td>
                </tr>
        )
      }
    </tbody>
  </table>
</div>

            </div>
            </div>
            

            </div>
            </div>
            </div>
    );
};

export default MedicineStore;