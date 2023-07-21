import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';

const useCart = () => {
    const {user,loading} = useContext(AuthContext)
    const token= localStorage.getItem("access-token")
    const {data: Cart = [],refetch,CartLoading} = useQuery({
        queryKey:["Cart",user?.email],
        queryFn: async ()=>{
            const response = await fetch(`http://localhost:5000/addtocart?email=${user?.email}`)
            return response.json()
        }
    })
    return [Cart,refetch,CartLoading];
};

export default useCart;