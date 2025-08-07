import { NavLink, useNavigate } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";

function Header() {
    const token = getCookie("token");
    const isLogin = useSelector(state => state.loginReducer);
    const navigate = useNavigate(); // Thêm useNavigate để điều hướng

    return (
        <>
        <header className="layout-default__header">
          <div 
            className="layout-default__logo" 
            onClick={() => navigate("/")} // Thêm sự kiện onClick để điều hướng
            style={{ cursor: "pointer" }} // Thêm con trỏ chỉ tay để hiển thị rõ ràng
          >
            IT Jobs
          </div>
          <div className="menu">
            {/* Nội dung menu sẽ được thêm vào nếu cần */}
          </div>

          <div className="layout-default__account">
            {token ? (
              <>
                <NavLink to="/admin">Quản lí</NavLink>
                <NavLink to="/logout">Đăng xuất</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login">Đăng nhập</NavLink>
                <NavLink to="/register">Đăng ký</NavLink>
              </>
            )}
          </div>
        </header>
        </>
    );
}

export default Header;
