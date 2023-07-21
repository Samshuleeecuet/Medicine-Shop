import React, { useState } from 'react';
import useFindMedicine from '../../hooks/useFindMedicine/useFindMedicine';
import useMedicineStore from '../../hooks/useMedicineStore/useMedicineStore';
import { IoMdAdd } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import useUser from '../../hooks/useUser/useUser';
import useCart from '../../hooks/useCart/useCart';
const Home = () => {
    const [searchvalue,setSearchvalue] = useState(null);
    const [SearchMedicine] = useFindMedicine(searchvalue)
    const [isUser] = useUser()
    const [Cart,refetch] = useCart()
    const handleChange =(e)=>{
        setSearchvalue(e.target.value)
    }
    console.log(Cart)
    const handleAddToCart = (item)=>{
        console.log(item)
        const email = isUser.email;
        const medicineId = item.medicineId;
        const medicineName = item.medicineName;
        const quantity = 1;
        const companyName = item.companyName;
        const medicines = item.medicines;
        const price = item.medicines[item.medicines.length-1].price;
        const type = item.type;
        const medicine = {medicineId,medicineName,companyName,type,quantity,medicines,price,email}
        fetch('http://localhost:5000/addtocart',{
                    method: 'POST',
                        headers:{
                          'content-type': 'application/json'
                        },
                        body: JSON.stringify(medicine)
                })
                .then(res=> res.json())
                .then(result=>{
                    refetch()
                    console.log(result)
                    if(result.insertedId){
                        toast.success('Medicine Added To Cart')
                    }
                    if(result.message){
                        toast.error(result.message)
                    }
                })
    }
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
                    <th>Batch<br/> No.</th>
                    <th>Price</th>
                    <th>Avalaible<br/> Quantity</th>
                    <th>Expire<br/> Date</th>
                    <th>Box<br/> No.</th>
                    <th>EntryDate<br/> Date</th>
                    <th>Order Now</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {
                    SearchMedicine && SearchMedicine.map((item)=> <tr key={item.medicineId}>
                    <td>
                        {item.medicineId}
                    </td>
                    <td>
                    <div className="flex items-center space-x-3">                         
                    <div onClick={()=>handleLight(item)} className='cursor-pointer'>
                        <div className="font-bold">{item.medicineName} | {item.type}</div>
                        <span className="badge badge-secondary ">{item.genericName}</span>
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
                    <td>
                        <p  onClick={()=>handleAddToCart(item)} className='text-xs btn btn-xs bg-green-400 hover:bg-green-400'><IoMdAdd/>Add</p>
                    </td>
                    
                </tr>
                )}    
                </tbody>
            </table>
            </div>
            </div>
            }
        </div>
    );
};

export default Home;