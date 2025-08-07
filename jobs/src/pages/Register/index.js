import { useNavigate } from "react-router-dom";
import "./Register.css";
import { checkExits, createCompany } from "../../services/companyServiece";
import { generateToken } from "../../helpers/generateToken";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    

    // Lấy giá trị từ form
    const fullName = e.target["full-name"].value;
    const email = e.target["email"].value;
    const phone = e.target["phone"].value;
    const password = e.target["password"].value;
    const confirmPassword = e.target["confirm-password"].value;

    // Kiểm tra email và phone có tồn tại không
    const checkExitsEmail = await checkExits("email", email);
    const checkExitsPhone = await checkExits("phone", phone);

    if (checkExitsEmail.length > 0) {
      alert("Email đã tồn tại");
    } else if (checkExitsPhone.length > 0) {
      alert("Số điện thoại đã tồn tại");
    } else if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp");
    } else {
      try {
        // Tạo đối tượng dữ liệu để gửi đi
        const companyData = {
          fullName,
          email,
          phone,
          password,
          token: generateToken(),
        };

        // Tạo công ty
        const result = await createCompany(companyData);
        
        // Nếu tạo thành công, chuyển hướng đến trang login
        if (result) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Đã có lỗi xảy ra khi tạo công ty:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    }
  };

  return (
    <>
      <div className="register-form-container">
        <h2>Đăng Ký Tài Khoản</h2>
        <form id="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="full-name">Tên công ty</label>
            <input type="text" id="full-name" name="full-name" placeholder="Nhập Tên công ty" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Nhập email của bạn" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input type="tel" id="phone" name="phone" placeholder="Nhập Số điện thoại" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
            <input type="password" id="confirm-password" name="confirm-password" placeholder="Xác nhận mật khẩu" required />
          </div>
          <button type="submit" className="submit-btn">
            Đăng Ký
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
