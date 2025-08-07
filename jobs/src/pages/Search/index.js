import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllJob } from "../../services/jobsService";
import "./Search.css"
import SearchList from "./SearchList";


function Search() {

    const [searchParams,setSearchParams] = useSearchParams();
    const [data,setData] = useState();
    const citySearch = searchParams.get("city") || "";
    const keywordSearch = searchParams.get("keyword") || "";

    useEffect(() => {   
        const fetchAPI = async () => {
            const  response = await getAllJob();
            if(response) {
                const newData = response.filter((item) =>{
                    const city = citySearch ? item.city?.includes(citySearch) : true;
                    const keyword = keywordSearch ? item.tags?.includes(keywordSearch) : true;
                    const status = item.status;            
                    return city && keyword && status;
                              
                })
                 setData(newData.reverse());
                // console.log(newData);
                
            }
            
        };
        fetchAPI();

    },[])

    return (
        
        <>
        <div>
    <strong>Kết quả tìm kiếm:</strong>
    {citySearch && <div className="search-results__tag">{citySearch}</div>}
    {keywordSearch && <div className="search-results__tag">{keywordSearch}</div>}
        </div>

        {data && ( 
            <SearchList data = {data} />
        )}
        </>
    );
}

export default Search;