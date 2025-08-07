import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailCompany } from "../../services/companyServiece";
import "./CompanyDetail.css";
import { getListJob } from "../../services/jobsService";
import JobItem from "../../components/JobItem";

function CompanyDetail() {
  const params = useParams();
  const [infoCompany, setInfoCompany] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getDetailCompany(params.id);
      if (response) {
        setInfoCompany(response);
      }
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListJob(params.id);
      if (response) {
        setJobs(response);
      }
    };
    fetchAPI();
  }, []);
  console.log(jobs);

  return (
    <>
      <div className="company-detail">
        <button className="back-button" onClick={() => navigate(-1)}>
          Trở lại
        </button>
        <div className="company-info">
          <h2 className="company-name">{infoCompany.companyName}</h2>
          <span>
            Địa chỉ: <strong>{infoCompany.address}</strong>
          </span>
          <span>
            Số lượng nhân sự: <strong>{infoCompany.quantityPeople}</strong>
          </span>
          <span>
            Thời gian làm việc: <strong>{infoCompany.workingTime}</strong>
          </span>
          <span>
            Mô tả ngắn: <strong>{infoCompany.description}</strong>
          </span>
          <span>
            Mô tả chi tiết: <strong>{infoCompany.detail}</strong>
          </span>
        </div>
      </div>

      <div className="company-jobs">
        <h3 className="jobs-title">Danh sách các jobs của công ty</h3>
        {jobs.map((item) => (
            <div key={item.id}>
                <JobItem item = {item}/>
            </div>
        ))}
      </div>
    </>
  );
}

export default CompanyDetail;
