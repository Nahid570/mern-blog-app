import React from 'react'
import AdminNavbar from './admin/AdminNavbar'
import PrivateNavbar from './private/PrivateNavbar'
import PublicNavbar from './public/PublicNavbar'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const storeData = useSelector(state => state.users);
    const {userAuth} = storeData;
    const isAdmin = userAuth?.isAdmin;
    
  return (
    <>
        {
            isAdmin ? <AdminNavbar /> : userAuth ? <PrivateNavbar/> : <PublicNavbar />
        }
    </>
  )
}

export default Navbar