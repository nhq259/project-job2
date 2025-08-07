import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getDetailCompany } from "../../services/companyServiece";

function InfoCompany() {
    const idCompany = getCookie("id");

    const [data, setData] = useState();

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getDetailCompany(idCompany);
            setData(response);
        };
        fetchAPI();
    }, []);

    return (
        <div className="statistic-card company-info">
            {data && (
                <>
                    <strong className="statistic-title">THÔNG TIN CÔNG TY</strong>
                    <span className="statistic-item">Tên công ty: <strong>{data.companyName}</strong></span>
                    <span className="statistic-item">Email: <strong>{data.email}</strong></span>
                    <span className="statistic-item">Số điện thoại: <strong>{data.phone}</strong></span>
                    <span className="statistic-item">Số nhân viên: <strong>{data.quantityPeople}</strong></span>
                </>
            )}
        </div>
    );
}

export default InfoCompany;
