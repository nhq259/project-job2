import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailJob, updateJob } from "../../services/jobsService"; // Đảm bảo có updateJob trong jobsService

function EditJob() {
  const { id } = useParams();  // Lấy ID từ URL
  const navigate = useNavigate();
  const [job, setJob] = useState(null);  // Lưu trữ thông tin job
  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    tags: "",
    status: false
  });

  // Lấy thông tin job từ API
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getDetailJob(id);  // Lấy thông tin job từ API
        if (response) {
          setJob(response);  // Lưu thông tin job vào state
          setFormData({
            name: response.name,
            salary: response.salary,
            tags: response.tags.join(", "),  // Chuyển tags thành chuỗi để hiển thị
            status: response.status
          });
        } else {
          console.error("Không tìm thấy công việc với ID:", id);
          navigate("/404");  // Chuyển hướng nếu không tìm thấy job
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin công việc:", error);
        navigate("/404");  // Chuyển hướng nếu có lỗi
      }
    };
    fetchJob();
  }, [id, navigate]);

  // Cập nhật formData khi người dùng thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Cập nhật status khi người dùng thay đổi checkbox
  const handleStatusChange = () => {
    setFormData(prevData => ({
      ...prevData,
      status: !prevData.status
    }));
  };

  // Xử lý submit form để cập nhật job
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedJob = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim())  // Chuyển lại tags thành mảng
    };

    const response = await updateJob(id, updatedJob);  // Gọi API để cập nhật job

    if (response) {
      navigate(`/job-manage`);  // Chuyển hướng tới trang chi tiết job sau khi cập nhật
    } else {
      console.error("Cập nhật công việc thất bại");
    }
  };

  if (!job) {
    return <div>Loading...</div>;  // Chờ khi chưa có dữ liệu
  }

  const handleBack = () => {
     navigate(-1)
  }

  return (
    <div className="edit-job">
      <h2>Sửa công việc</h2>
      <button onClick={handleBack}>Trở lại</button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên Job:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mức lương ($):</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Tags:</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Trạng thái:</label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleStatusChange}
          />
          <span>{formData.status ? "Đang bật" : "Đang tắt"}</span>
        </div>

        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
}

export default EditJob;
