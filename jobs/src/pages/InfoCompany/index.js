import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { editCompany, getDetailCompany } from "../../services/companyServiece";
import "./InfoCompany.css"

function InfoCompany() {
  const idCompany = getCookie("id");
  const [info, setInfo] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  // Lấy thông tin công ty từ API
  const fetchAPI = async () => {
    const response = await getDetailCompany(idCompany);
    if (response) {
      setInfo(response);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Xử lý khi người dùng submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedInfo = new FormData(e.target); // Lấy dữ liệu từ form
    const updatedData = {
      companyName: updatedInfo.get("companyName"),
      email: updatedInfo.get("email"),
      phone: updatedInfo.get("phone"),
      address: updatedInfo.get("address"),
      quantityPeople: updatedInfo.get("quantityPeople"),
      workingTime: updatedInfo.get("workingTime"),
      website: updatedInfo.get("website"),
      description: updatedInfo.get("description"),
      detail: updatedInfo.get("detail"),
    };

    const response = await editCompany(idCompany, updatedData);
    if (response) {
      alert("Cập nhật thành công");
      fetchAPI(); // Lấy lại thông tin mới từ API
      setIsEdit(false); // Tắt chế độ chỉnh sửa
    }
  };

  // Bật chế độ chỉnh sửa
  const handleEdit = () => {
    setIsEdit(true);
  };

  // Hủy chỉnh sửa và trả lại giá trị ban đầu
  const handleCancel = () => {
    setIsEdit(false);
    fetchAPI(); // Tải lại thông tin công ty từ API để trả lại giá trị ban đầu
  };

  // Hàm cập nhật giá trị khi người dùng nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo(prevInfo => ({
      ...prevInfo,
      [name]: value, // Cập nhật giá trị mới vào state
    }));
  };

  return (
    <div className="info-company">
      <h2>Thông tin công ty</h2>
      <button onClick={handleEdit}>Chỉnh sửa</button>
      {isEdit && <button onClick={handleCancel}>Hủy</button>} {/* Hiển thị nút Hủy khi đang chỉnh sửa */}

      {info && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên công ty:</label>
            <input
              type="text"
              name="companyName"
              value={info.companyName || ""}
              disabled={!isEdit}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={info.email || ""}
              disabled={!isEdit}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              value={info.phone || ""}
              disabled={!isEdit}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Địa chỉ:</label>
            <input
              type="text"
              name="address"
              value={info.address || ""}
              disabled={!isEdit}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Số lượng nhân sự:</label>
            <input
              type="number"
              name="quantityPeople"
              value={info.quantityPeople || ""}
              disabled={!isEdit}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Thời gian làm việc:</label>
            <input
              type="text"
              name="workingTime"
              value={info.workingTime || ""}
              disabled={!isEdit}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Link website:</label>
            <input
              type="text"
              name="website"
              value={info.website || ""}
              disabled={!isEdit}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Mô tả ngắn:</label>
            <textarea
              name="description"
              value={info.description || ""}
              disabled={!isEdit}
              onChange={handleInputChange}
              cols={16}

            />
          </div>
          <div className="form-group">
            <label>Mô tả chi tiết:</label>
            <textarea
              name="detail"
              value={info.detail || ""}
              disabled={!isEdit}
              onChange={handleInputChange}
              cols={16}
            />
          </div>
          {isEdit && <button type="submit">Lưu thông tin</button>}
        </form>
      )}
    </div>
  );
}

export default InfoCompany;
