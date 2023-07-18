import React from 'react';
import useMedicineStore from '../../hooks/useMedicineStore/useMedicineStore';
import moment from 'moment';
import EntryReport from './EntryReport';


const MedicineStore = () => {
    const [isMedicines] = useMedicineStore()
 let exp;
    return (
        <div className='pt-10'>
            <div>
                <h1 className='pb-6 text-2xl font-bold mb-8 text-center font-serif'>Medicine Info</h1>
            </div>
            <div className='flex'>
                <div>
                <EntryReport/>

                </div>
                <div className="overflow-x-auto lg:w-2/3 mx-auto">
            <table className="table">
                <thead>
                <tr className=' bg-gray-400/40 text-black'>
                    <th>Id</th>
                    <th>Name | Type<br/><span className='text-gray-800/50'>Generic</span></th>
                    <th>Company</th>
                    <th>Price</th>
                    <th>Avalaible<br/> Quantity</th>
                    <th>Box<br/> Number</th>
                    <th>Expire<br/> Date</th>
                    <th>Entry<br/> Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {
                    isMedicines && isMedicines.map((item)=> <tr key={item.medicineId}>
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
                    <td>{item.entrydate}</td>
                    <th key={item.medicineId}>

                        {
                        moment(item.expiredate, "DD-MM-YYYY").fromNow().split(' ').map((expi,index)=>{
                                    exp=parseInt(expi);
                                    
                                    if(exp){
                                        
                                        if(moment(item.expiredate, "DD-MM-YYYY").fromNow().includes('hours')){
                                            return <button className="btn btn-warning btn-xs">Expired {moment(item.expiredate, "DD-MM-YYYY").fromNow()}</button> 
                                        }
                                        if(exp>7){
                                            if(moment(item.expiredate, "DD-MM-YYYY").fromNow().includes('in')){
                                                return <button className="btn btn-success btn-xs">Expired {moment(item.expiredate, "DD-MM-YYYY").fromNow()}</button> 
                                            }
                                        }

                                        if(exp<7){
                                            if(moment(item.expiredate, "DD-MM-YYYY").fromNow().includes('in')){
                                                return <button className="btn btn-warning btn-xs">Expired {moment(item.expiredate, "DD-MM-YYYY").fromNow()}</button> 
                                            }
                                            
                                        }
                                    }
                                    else{
                                        if(expi.includes('a' && 'ago')){
                                            return <p className="btn btn-error btn-xs">Expired</p> 
                                        }
                                        if(expi.includes('in')){
                                            if(moment(item.expiredate, "DD-MM-YYYY").fromNow() === 'in a day'){
                                                return <p className="btn btn-error btn-xs">Expired</p> 
                                            }
                                        }
                                    }
                                    
                                })
                                
                                
                        }
                        
                    {/* <button className="btn btn-error btn-xs">details</button> */}
                    </th>
                </tr>
        )
                }
                    
                </tbody>
            </table>
            </div>
            </div>
            </div>
    );
};

export default MedicineStore;