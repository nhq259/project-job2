import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyServiece";
import { Link } from "react-router-dom";
import "./Company.css"

function Company() {
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
  console.log(data);

  return (
    <div className="company-list">
      <h1>Danh sách các công ty</h1>
      {data.length > 0 ? (
        data.map((item) => (
          <Link to={`/company/${item.id}`} key={item.id} className="company-item">
            <span>
              Công ty: <strong>{item.companyName}</strong>
            </span>
            <span>
              Số điện thoại: <strong>{item.phone}</strong>
            </span>
            <span>
              Số nhân sự: <strong>{item.quantityPeople}</strong>
            </span>
            <span>
              Website: <strong>{item.website}</strong>
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
  );
  
}
export default Company;
