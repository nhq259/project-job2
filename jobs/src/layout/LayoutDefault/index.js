import { NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function LayoutDefault() {
  const token = getCookie("token");
  // console.log(token);

  const isLogin = useSelector(state => state.loginReducer);
 
  return (
    <>
      <div className="layout-default">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    </>
  );
}

export default LayoutDefault;
