import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';
const useUser = () => {
    const {user,loading} = useContext(AuthContext)
    const token= localStorage.getItem("access-token")
    const {data: isUser = [],refetch,isUserLoading} = useQuery({
        queryKey:["isUser",user?.email],
        queryFn: async ()=>{
            const response = await fetch(`http://localhost:5000/user/${user?.email}`);
            return response.json()
        }
    })
    return [isUser,refetch,isUserLoading];
};

export default useUser;