import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { deleteCV, getListCV } from "../../services/cvService";
import { getListJob } from "../../services/jobsService";
import { Link } from "react-router-dom";

function CVList() {
    const idCompany = getCookie("id");
    const [listCV, setListCV] = useState([]);
    const [listJobs, setListJobs] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                // Gọi cả hai API
                const [cvResponse, jobsResponse] = await Promise.all([
                    getListCV(idCompany),
                    getListJob(idCompany),
                ]);

                if (cvResponse && jobsResponse) {
                    // Map tên Job vào danh sách CV
                    const mergedData = cvResponse.map((cv) => {
                        const job = jobsResponse.find((job) => Number(job.id) === Number(cv.idJob));
                        return {
                            ...cv,
                            jobName: job ? job.name : "Không xác định",
                        };
                    });

                    setListCV(mergedData);
                    setListJobs(jobsResponse);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAPI();
    }, [idCompany]);

    const handleDeleteCV = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa CV này?");
        if (confirmDelete) {
          const response = await deleteCV(id);
          if (response) {
            // Nếu xóa thành công, cập nhật lại danh sách công việc
            setListCV(prevCV => prevCV.filter(listCV => listCV.id !== id));
          } else {
            alert("Xóa CV không thành công!");
          }
        }
      };

    return (
        <div className="cv-list-container">
            <table className="cv-list-table">
                <thead>
                    <tr>
                        <th>Tên Job</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Ngày gửi</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listCV.map((cv) => (
                        <tr key={cv.id}>
                            <td>{cv.jobName}</td>
                            <td>{cv.name}</td>
                            <td>{cv.phone}</td>
                            <td>{cv.email}</td>
                            <td>{cv.createAt}</td>
                            <td>{cv.statusRead ? "Đã đọc" : "Chưa đọc"}</td>
                            <td>
                                <div className="cv-action-buttons">
                                  <Link to={`/detail-cv/${cv.id}`}>  <button>Xem chi tiết</button></Link> 
                                  <button  onClick={() => handleDeleteCV(cv.id)}>Xóa</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CVList;
