import { useEffect, useState } from "react";
import { getListTag } from "../../services/tagService";
import { Link } from "react-router-dom";
import "./SkillList.css"

function SkillList() {
    const [tag, setTag] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getListTag();
            if (response) {
                setTag(response);
            }
        };
        fetchAPI();
    }, []);

    return (
        <div className="skill-list-container">
            {tag.length > 0 ? (
                tag.map((item) => (
                    <Link
                        to={`/search?keyword=${item.value || ""}`}
                        key={item.key}
                        className="tag"
                    >
                        {item.value}
                    </Link>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default SkillList;
