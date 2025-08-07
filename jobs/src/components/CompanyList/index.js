import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyServiece";
import "./CompanyList.css"; 
import { Link } from "react-router-dom";

function CompanyList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getAllCompany();
      if (response) {
        setData(response);
      }
    };
    fetchAPI();
  }, []);

  return (
    <>
      <h2>Danh sách công ty</h2>
      <div className="company-list-container">
        {data.length > 0 ? (
          data.map((item) => (
            <Link
              to={`/company/${item.id}`}
              className="company-card"
              key={item.id}
            >
              <span>
                Công ty: <strong>{item.companyName}</strong>
              </span>
              <span>
                Số nhân sự: <strong>{item.quantityPeople}</strong>
              </span>
              <span>
                Địa chỉ: <strong>{item.address}</strong>
              </span>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button className="btnXemthem">
        <Link to={`/company`}>Xem thêm</Link>
      </button>
    </>
  );
}

export default CompanyList;
