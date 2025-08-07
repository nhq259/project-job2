import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListJob } from "../../services/jobsService";

function JobStatistic() {
    const idCompany = getCookie("id");

    const [data, setData] = useState();

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getListJob(idCompany);
            if (response) {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFlase: 0
                };
                obj.total = response.length;
                response.forEach(item => {
                    item.status ? obj.statusTrue++ : obj.statusFlase++;
                });
                setData(obj);
            }
        };
        fetchAPI();
    }, []);

    return (
        <div className="statistic-card job-statistic">
            {data && (
                <>
                    <strong className="statistic-title">JOB</strong>
                    <span className="statistic-item">Số lượng job: <strong>{data.total}</strong></span>
                    <span className="statistic-item">Job đang bật: <strong>{data.statusTrue}</strong></span>
                    <span className="statistic-item">Job đang tắt: <strong>{data.statusFlase}</strong></span>
                </>
            )}
        </div>
    );
}

export default JobStatistic;
