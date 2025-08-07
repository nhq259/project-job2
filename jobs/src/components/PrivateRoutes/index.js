import { Navigate, Outlet } from "react-router-dom";

function PrivateRotes() {

    const isLogin = true;

    return (
    <>
    {isLogin ? (<Outlet/>) : (<Navigate to="/login"/>) }
    </>
    )
  }
  
  export default PrivateRotes;
  