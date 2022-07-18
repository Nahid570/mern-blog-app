import React from "react";
import AdminNavbar from "./admin/AdminNavbar";
import PrivateNavbar from "./private/PrivateNavbar";
import PublicNavbar from "./public/PublicNavbar";
import { useSelector } from "react-redux";
import AccVerificationAlert from "./AccVerificationAlert/AccVerificationAlert";
import AccVerSuccess from "./AccVerificationAlert/AccVerSuccess";

const Navbar = () => {
  const storeData = useSelector((state) => state.users);
  const { userAuth } = storeData;
  const isAdmin = userAuth?.isAdmin;
  
  // get account verification status
  const account = useSelector(state => state?.accountVerification);
  const {sendToken} = account;

  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
      {(userAuth && !userAuth?.isAccountVerified) && <AccVerificationAlert />}
     {sendToken && <AccVerSuccess />}
    </>
  );
};

export default Navbar;
