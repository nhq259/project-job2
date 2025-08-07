import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailJob } from "../../services/jobsService";
import { getDetailCompany } from "../../services/companyServiece";
import "./JobDetail.css";
import { getTimeCurrent } from "../../helpers/getTime";
import { createCV } from "../../services/cvService";

function JobDetail() {
  const params = useParams();
  const [job, setJob] = useState([]); // Khởi tạo giá trị null
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await getDetailJob(params.id);
        const infoCompany = await getDetailCompany(response.idCompany);
        const dataFinal = {
          ...response,
          infoCompany: infoCompany,
        };

        setJob(dataFinal);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false); // Đảm bảo loading được set false ngay cả khi có lỗi
      }
    };
    fetchAPI();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

// console.log(job);

const handleSubmit = async (e) => {

  // Thu thập dữ liệu từ form
  const formData = {
    name: e.target.name.value,
    phone: e.target.phone.value,
    email: e.target.email.value,
    city: e.target.city.value,
    description: e.target.description.value,
    projects: e.target.projects.value,
    idJob: job.id,
    idCompany: job.infoCompany.id,
    createAt: getTimeCurrent(),
  };

  try {
    const response = await createCV(formData); // Gửi dữ liệu qua API
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


  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị loading nếu dữ liệu chưa tải xong
  }

  if (!job) {
    return <div>Không tìm thấy dữ liệu công việc.</div>; // Hiển thị thông báo khi không có dữ liệu
  }

  return (
    <>
      <div className="job-detail-container">
        <button className="back-button" onClick={handleGoBack}>
          Trở lại
        </button>
        <div className="job-content">
          <h1 className="job-title">{job.name}</h1>
          <button
            className="custom-button"
            onClick={() => {
              const element = document.getElementById("formApply");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            ỨNG TUYỂN NGAY
          </button>

          <div className="job-tags">
            <span className="label">Tags:</span>
            {job.tags?.map((tag, index) => (
              <div className="tag" key={index}>
                {tag}
              </div>
            ))}
          </div>

          <div className="job-city">
            <span className="label">Thành phố:</span>
            {job.city?.map((city, index) => (
              <div className="city" key={index}>
                {city}
              </div>
            ))}
          </div>

          <div className="job-salary">
            Mức lương: <strong className="salary">{job.salary}$</strong>
          </div>

          <div className="company-address">
            Địa chỉ công ty:{" "}
            <strong className="address">{job.infoCompany?.address}</strong>
          </div>

          <div className="post-date">
            Thời gian đăng bài:{" "}
            <strong className="date">{job.createAt}</strong>
          </div>

          <div className="job-description">
            <span className="label">Mô tả công việc:</span> {job.description}
          </div>

          <div className="company-description">
            <span className="label">Giới thiệu công ty:</span>{" "}
            {job.infoCompany?.description}
          </div>
        </div>
      </div>

      <div id="formApply">
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          <h2 style={{ textAlign: "center" }}>Form Ứng Tuyển</h2>
          <form onSubmit={handleSubmit}>
            {/* Họ tên */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "8px" }}
              >
                Họ và Tên
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nhập họ và tên"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                required
              />
            </div>

            {/* Số điện thoại */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="phone"
                style={{ display: "block", marginBottom: "8px" }}
              >
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Nhập số điện thoại"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                pattern="[0-9]{10}"
                required
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="email"
                style={{ display: "block", marginBottom: "8px" }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Nhập email"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                required
              />
            </div>

            {/* Thành phố */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="city"
                style={{ display: "block", marginBottom: "8px" }}
              >
                Thành phố
              </label>
              <select
                name="city"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                required
              >
                <option value="">Chọn thành phố</option>
                {job.city?.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Giới thiệu bản thân */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="description"
                style={{ display: "block", marginBottom: "8px" }}
              >
                Giới thiệu bản thân
              </label>
              <textarea
                name="description"
                placeholder="Giới thiệu về bản thân"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                rows="4"
                required
              ></textarea>
            </div>

            {/* Danh sách link project */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="projects"
                style={{ display: "block", marginBottom: "8px" }}
              >
                Danh sách link project đã làm
              </label>
              <textarea
                name="projects"
                placeholder="Liệt kê các link project của bạn"
                style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                rows="4"
                required
              ></textarea>
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
                Gửi Yêu Cầu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default JobDetail;
