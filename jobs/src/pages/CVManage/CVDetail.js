import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailCV, updateCVStatusRead } from "../../services/cvService";
import { getDetailJob } from "../../services/jobsService";

function CVDetail() {
    const params = useParams();
    const [job, setJob] = useState();
    const [cv, setCV] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getDetailCV(params.id);
            if (response) {
                const responseJob = await getDetailJob(response.idJob);
                if (responseJob) {
                    setCV(response);
                    setJob(responseJob);
                }
            }
            updateCVStatusRead(params.id, { statusRead: true });
        };
        fetchAPI();
    }, []);

    if (!cv || !job) {
        return <div>Loading...</div>;
    }

    const handleBack = () =>{
        navigate(`/cv-manage`)
    }
    return (
        <div className="cv-detail-container">
            <h1>Chi tiết CV</h1>
            <button onClick={handleBack}>Trở lại</button>
            <div className="cv-info">
                <h2>{cv.name}</h2>
                <p><strong>Ngày gửi:</strong> {cv.createAt}</p>
                <p><strong>Số điện thoại:</strong> {cv.phone}</p>
                <p><strong>Email:</strong> {cv.email}</p>
                <p><strong>Thành phố ứng tuyển:</strong> {cv.city}</p>
                <p><strong>Giới thiệu bản thân:</strong> {cv.description}</p>
                <p><strong>Link project:</strong> <a href={cv.linkProject} target="_blank" rel="noopener noreferrer">{cv.linkProject}</a></p>
            </div>

            <div className="job-info">
                <h2>Thông tin công việc</h2>
                <p><strong>Chức danh:</strong> {job.name}</p>
                <p><strong>Mức lương:</strong> {job.salary}</p>
                <p><strong>Mô tả công việc:</strong> {job.description}</p>
                <p><strong>Tags:</strong> {job.tags.join(', ')}</p>
            </div>
        </div>
    );
}

export default CVDetail;
