import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailJob } from "../../services/jobsService";

function DetailJob() {
  const params = useParams();
  const [job, setJob] = useState(null); // Initialize job as null to avoid undefined error
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getDetailJob(params.id);
      if (response) {
        setJob(response);
      }
    };
    fetchAPI();
  }, [params.id]); // Make sure the effect re-runs when params.id changes

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!job) {
    // Optionally show a loading state or a message while the job data is being fetched
    return <div>Loading...</div>;
  }


  return (
    <div className="job-detail-container">
      <button className="back-button" onClick={handleGoBack}>
        Trở lại
      </button>
      <div className="job-content">
        <h1 className="job-title">Tên Job : {job.name}</h1>

        <div className={`job-status ${job.status ? "active" : "inactive"}`}>
          <span className="label">Trạng thái:</span>
          <div className="status">
            {job.status ? "Job đang bật" : "Job đang tắt"}
          </div>
        </div>

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

        <div className="post-date">
          Ngày tạo: <strong className="date">{job.createAt}</strong>
        </div>

        <div className="job-description">
          <span className="label">Mô tả công việc:</span> {job.description}
        </div>
      </div>
    </div>
  );
}

export default DetailJob;
