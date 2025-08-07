import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getListTag } from "../../services/tagService";
import { getListCity } from "../../services/cityService";
import { getTimeCurrent } from "../../helpers/getTime";
import { createJob } from "../../services/jobsService";
import "./CreateJob.css";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const idCompany = getCookie("id");
  const [tags, setTags] = useState();
  const [city, setCity] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => { 
      const response = await getListTag();
      if (response) {
        setTags(response);
      }
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListCity();
      if (response) {
        setCity(response);
      }
    };
    fetchAPI();
  }, []);

  const handleSubmit = async (e) => {
    // Thu thập dữ liệu từ form
    const formData = {
      idCompany: parseInt(idCompany),
      name: e.target.name.value,
      tags: e.target.tags.value.split(","),
      salary: e.target.salary.value,
      city: e.target.city.value.split(","),
      description: e.target.description.value,
      status: e.target.status.checked,
      updateAt: getTimeCurrent(),
    };

    try {
      const response = await createJob(formData); // Gửi dữ liệu qua API
      if (response) {
        alert("Gửi yêu cầu thành công!");
      } else {
        alert("Gửi yêu cầu không thành công, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Đã xảy ra lỗi khi gửi yêu cầu, vui lòng thử lại sau!");
    }
  };

  // Hàm quay lại trang trước
  const handleGoBack = () => {
    navigate("/job-manage");
  };

  return (
    <>
      <div>
        <h1>Tạo Job mới</h1>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            {/* Tên Job*/}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="name" style={{ display: "block", marginBottom: "8px" }}>
                Tên Job
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nhập tên job"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                required
              />
            </div>

            {/* Tags */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="tags" style={{ display: "block", marginBottom: "8px" }}>
                Tags
              </label>
              <select
                name="tags"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                required
              >
                <option value=""> Chọn tags</option>
                {tags?.map((tags) => (
                  <option key={tags.id} value={tags.value}>
                    {tags.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Mức lương */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="salary" style={{ display: "block", marginBottom: "8px" }}>
                Mức lương
              </label>
              <input
                type="text"
                name="salary"
                placeholder="Nhập lương $"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                required
              />
            </div>

            {/* Thành phố */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="city" style={{ display: "block", marginBottom: "8px" }}>
                Thành phố
              </label>
              <select
                name="city"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                required
              >
                <option value=""> Chọn thành phố</option>
                {city?.map((city) => (
                  <option key={city.id} value={city.value}>
                    {city.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Mô tả Jobs */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="description" style={{ display: "block", marginBottom: "8px" }}>
                Mô tả công việc
              </label>
              <textarea
                name="description"
                placeholder="Mô tả"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                rows="4"
                required
              ></textarea>
            </div>

            {/* Trạng thái Job (Bật/Tắt) */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="status" style={{ display: "block", marginBottom: "8px" }}>
                Trạng thái
              </label>

              <div className="checkbox-container">
                <input type="checkbox" name="status" id="status" />
                <div className="checkmark"></div>
                <label htmlFor="status">Bật trạng thái</label>
              </div>
            </div>

            {/* Nút gửi */}
            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Tạo Jobs
              </button>
            </div>

            {/* Nút Trở lại */}
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button
                type="button"
                onClick={handleGoBack}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#ccc",
                  color: "#333",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Trở lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateJob;
