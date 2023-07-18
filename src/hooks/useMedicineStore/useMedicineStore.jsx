import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';


const useMedicineStore = () => {
    const {user,loading} = useContext(AuthContext)
    const token= localStorage.getItem("access-token")
    const {data: isMedicines = [],refetch,isMedicinesLoading} = useQuery({
        queryKey:["isMedicines",user?.email],
        queryFn: async ()=>{
            const response = await fetch(`http://localhost:5000/medicineInfo`);
            return response.json()
        }
    })
    return [isMedicines,refetch,isMedicinesLoading];
};

export default useMedicineStore;