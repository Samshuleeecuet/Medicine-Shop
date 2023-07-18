import React, { useContext } from 'react';
import Container from './Cointainer';
import avatarImg from './../assets/placeholder.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser/useUser';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
  const [isUser] = useUser()
  const {logOut,setLoading} = useContext(AuthContext)
  console.log(isUser)
  const navigate = useNavigate()
    const navList  = <>
    <li><NavLink to='/medicine/home' className={({ isActive }) => (isActive ? 'active' : 'default')}>Find Medicine</NavLink></li>
    <li><NavLink to='/medicine/store' className={({ isActive }) => (isActive ? 'active' : 'default')}>Medicine Store</NavLink></li>
   <li><NavLink to='/medicine/addmedicine' className={({ isActive }) => (isActive ? 'active' : 'default')}>Add Medicine</NavLink></li>
   <li><NavLink to='/medicine/sellmedicine' className={({ isActive }) => (isActive ? 'active' : 'default')}>Sell Medicine</NavLink></li>
    </>
    const handleLogOut =()=> {
      logOut()
      navigate('/')
      setLoading(false)
    }
    return (
        <Container>
            <div className="navbar z-10 bg-white shadow-sm px-10">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box gap-3 w-52">
            {navList}
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl">MedicineShop</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal gap-2 px-1">
      {navList}
    </ul>
  </div>
  <div className="navbar-end gap-4">
    <button onClick={handleLogOut} className='btn btn-error'>LogOut</button>
    <div className="avatar">
        <div className="w-12 mask mask-squircle">
            <img src={isUser?.photourl ||avatarImg}/>
        </div>
    </div>
  </div>
        </div>
        </Container>
    );
};

export default Navbar;