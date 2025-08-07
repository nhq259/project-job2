import { Link } from "react-router-dom";
import "./JobItem.css"

function JobItem (props) {
    const {item} = props

    return (
        <div className="job-item">
            {<Link to={`/jobs/${item.id}`} className="job-item__link">{item.name}</Link>}
            <div className="job-item__info">
                <span>Ngôn ngữ: </span>
                {item.tags.map((tag, index) => (
                    <div key={index} className="job-item__tag">
                        {tag}
                    </div>
                ))}
            </div>
            <div className="job-item__info">
                <span>Thành phố: </span>
                {item.city.map((city, index) => (
                    <div key={index} className="job-item__city">
                        {city}
                    </div>
                ))}
            </div>
            <div className="job-item__salary">
                Lương: <strong>{item.salary}$</strong>
            </div>
            <div className="job-item__company">
                Công ty: <strong>{item?.infoCompany?.companyName}</strong>
            </div>
            <div className="job-item__date">
                Ngày tạo: <strong>{item.updateAt}</strong>
            </div>
        </div>
    );
}
export default JobItem;