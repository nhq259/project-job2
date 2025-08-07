import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListCV } from "../../services/cvService";

function CVStatistic() {
    const idCompany = getCookie("id");

    const [data, setData] = useState();

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getListCV(idCompany);
            if (response) {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFlase: 0
                };
                obj.total = response.length;
                response.forEach(item => {
                    item.statusRead ? obj.statusTrue++ : obj.statusFlase++;
                });
                setData(obj);
            }
        };
        fetchAPI();
    }, []);

    return (
        <div className="statistic-card cv-statistic">
            {data && (
                <>
                    <strong className="statistic-title">CV</strong>
                    <span className="statistic-item">Số lượng CV: <strong>{data.total}</strong></span>
                    <span className="statistic-item">CV đã đọc: <strong>{data.statusTrue}</strong></span>
                    <span className="statistic-item">CV chưa đọc: <strong>{data.statusFlase}</strong></span>
                </>
            )}
        </div>
    );
}

export default CVStatistic;
