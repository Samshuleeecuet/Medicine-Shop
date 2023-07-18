import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';

const useFindMedicine = (search) => {
    const {user,loading} = useContext(AuthContext)
    const token= localStorage.getItem("access-token")
    const {data: SearchMedicine = [],refetch,SearchMedicineLoading} = useQuery({
        queryKey:["SearchMedicine",search],
        queryFn: async ()=>{
            const response = await fetch(`http://localhost:5000/search?search=${search}`);
            return response.json()
        }
    })
    return [SearchMedicine,refetch,SearchMedicineLoading];
    
};

export default useFindMedicine;