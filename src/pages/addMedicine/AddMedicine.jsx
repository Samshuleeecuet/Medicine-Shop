import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-router-dom';
import Container from '../../Shared/Cointainer';
import moment from 'moment';
import Swal from 'sweetalert2'
import useMedicineStore from '../../hooks/useMedicineStore/useMedicineStore';
import useFindMedicine from '../../hooks/useFindMedicine/useFindMedicine';

const AddMedicine = () => {
    const [searchvalue,setSearchvalue] = useState(null);
    const [SearchMedicine] = useFindMedicine(searchvalue)
    const [isMedicines,refetch,] = useMedicineStore()
    const [Selected, setSelected] = useState(null)
    console.log(isMedicines)

    const handleName  = (e)=>{
        setSearchvalue(e.target.value)
        setSelected(e.target.value)
    }
    const handleSelect = (name)=>{
        setSelected(name)
        setSearchvalue(null)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const form = e.target;
        const medicineName = form.name.value;
        const genericName = form.generic.value;
        const companyName = form.company.value;
        const batchNumber= form.batch.value;
        const box = parseInt(form.box.value);
        const price = form.price.value;
        const quantity = form.quantity.value;
         const expiredate = moment(form.date.value).format('DD-MM-YYYY');
         const entrydate = moment(new Date()).format('DD-MM-YYYY');
        const type = form.type.value;
        const medicineId = isMedicines.length + 1;
        // const due = moment(date, "DD-MM-YYYY").fromNow()
        // due.split(' ').map((item,index)=>{
        //     item=parseInt(item);
        //     if(item){
        //         if(item<7){
        //             console.log(item)
        //         }
        //         if(item>7){
        //             console.log(item)
        //         }
        //     }else{
        //         console.log('NAN')
        //     }
        // })
        const formData = {medicineId,medicineName,genericName,companyName,batchNumber,type,box,bulb:'off',price,quantity,expiredate,entrydate}
        console.log(formData)
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Add it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:5000/addMedicine',{
                    method: 'POST',
                        headers:{
                          'content-type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                })
                .then(res=> res.json())
                .then(result=>{
                    refetch()
                    if(result.insertedId){
                    Swal.fire(
                        'Added!',
                        'Medicine Information has been Added.',
                        'success'
                    )
                }
                if(result.modifiedCount>0){
                    Swal.fire(
                        'Updated!',
                        'Medicine Information has been Updated.',
                        'success'
                    )
                }
            
            })
            }
          })
        

    }
    return (
        <Container>
            
            <Form onSubmit={handleSubmit} className='border p-4 rounded border-red-400 mt-20 w-2/3 mx-auto'>
                <div className='flex gap-4'>
                <div className="form-control relative" tabIndex={1}>
                    <label className="label">
                        <span className="label-text">Medicine Name</span>
                    </label>
                    <input onChange={handleName} type="text" name='name'  placeholder="Medicine Name" value={Selected} className="input border rounded-lg h-12 w-full pl-4 mb-4 border-red-400" required/>
                   {
                    searchvalue && SearchMedicine &&  <div className='absolute mt-[85px] w-full p-2 bg-white shadow-lg rounded-lg max-h-16 overflow-y-auto'>
                    <div>
                        {
                            SearchMedicine.map((item,index)=> <p key={index} onClick={()=>handleSelect(item.medicineName)} className='cursor-pointer hover:bg-black hover:bg-opacity-10 p-2'>{item.medicineName}</p> )
                        }
                    </div>
                    </div>
                   }
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Generic Name</span>
                    </label>
                    <input type="text" name='generic' placeholder="Generic Name" className="input border rounded-lg h-12 w-full pl-4 mb-4 border-red-400" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Name</span>
                    </label>
                    <input type="text" name='company'  placeholder="Company Name" className="input border rounded-lg h-12 w-full pl-4 mb-4 border-red-400" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Batch Number</span>
                    </label>
                    <input type="text" name='batch'  placeholder="Batch Number" className="input border rounded-lg h-12 w-full pl-4 mb-4 border-red-400" required />
                </div>
                </div>
                <div className='flex gap-4'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Medicine Type</span>
                    </label>
                    <select name='type' className="select select-secondary border-red-400 w-full max-w-xs" required>
  <option selected>Tablet</option>
  <option>Capsule</option>
  <option>Syrup</option>
</select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Box Number</span>
                    </label>
                    <input type="text" name='box' placeholder="Box Number" className="input border rounded-lg h-12 w-32 pl-4 mb-4 border-red-400" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type="text" name='price' placeholder="Price" className="input border rounded-lg h-12 w-32 pl-4 mb-4 border-red-400" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Quantity</span>
                    </label>
                    <input type="text" name='quantity' placeholder="Quantity" className="input border rounded-lg h-12 w-32 pl-4 mb-4 border-red-400" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Expire Date</span>
                    </label>
                    <input type="date" name='date' placeholder="Expire Date" className="input border rounded-lg h-12 w-full pl-4 mb-4 border-red-400" required/>
                </div>

                </div>
                <div className='flex gap-4'>
                
                
                
                </div>
                <input  className='btn btn-accent text-white' type="submit" value="Add Medicine" />
             </Form>
            
        </Container>
    );
};

export default AddMedicine;