import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyServiece";
import JobItem from "../../components/JobItem";


function SearchList (props) {
    const { data = []} = props;
    const [dataFinal,setDataFinal] = useState([]);

    useEffect (() => {
        const fetchAPI = async () =>{
            const company = await getAllCompany();
            const newData = data.map((item) =>{
                const infoCompany = company.find(
                    (itemCompany) => itemCompany.id == item.idCompany && itemCompany 
                );
                return{
                    infoCompany : infoCompany,
                    ...item
                }

            });
            setDataFinal(newData)

        };
        fetchAPI();

    },[])
    



    return (
        <>
        {dataFinal.length > 0 ? (
            <div className="search-list">
                {dataFinal.map((item)  =>(
                    <div key={item.id} className="search-list__item"> 
                        <JobItem item={item} />
                    </div>
                ))}
            </div>
        ) : (
            <div>Không tìm thấy công việc nào.</div>
        )}
        </>
    );
}

export default SearchList;
