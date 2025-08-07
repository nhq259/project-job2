import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { deleteJob, getListJob } from "../../services/jobsService";
import "./JobList.css"
import { Link } from "react-router-dom";

function JobList() {
  const idCompany = getCookie("id");
  const [jobs, setJobs] = useState([]);

  const fetchAPI = async () => {
    const response = await getListJob(idCompany);
    if (response) {
      setJobs(response.reverse());
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleDeleteJob = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa công việc này?");
    if (confirmDelete) {
      const response = await deleteJob(id);
      if (response) {
        // Nếu xóa thành công, cập nhật lại danh sách công việc
        setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      } else {
        alert("Xóa công việc không thành công!");
      }
    }
  };

  return (
    <>
      <div>
        <table className="job-list">
          <thead>
            <tr>
              <th>Tên job</th>
              <th>Tags</th>
              <th>Mức lương($)</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.name}</td>
                <td className="tags">
                  {job.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </td>
                <td>{job.salary}</td>
                <td>Ngày tạo: {job.createAt} --- Ngày cập nhật: {job.updateAt}</td>
                <td>
                  <span className={`status ${job.status ? 'active' : 'inactive'}`}>
                    {job.status ? "Đang bật" : "Đang tắt"}
                  </span>
                </td>
                <td className="action-buttons">
                <Link to={`/detail-job/${job.id}`}>
                <button>Chi tiết</button>
                </Link>
                  
                <Link to={`/edit-job/${job.id}`}>
                    <button>Sửa Công Việc</button>
                </Link>
              
                <button onClick={() => handleDeleteJob(job.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default JobList;
