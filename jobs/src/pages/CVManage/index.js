import CVList from "./CVList";
import "./cvManage.css"; // Import CSS vào component

function CVManage() {
    return (
        <div className="cv-manage-container">
            <h1 className="cv-manage-title">Danh sách CV</h1>
            <div>
                <CVList />
            </div>
        </div>
    );
}
export default CVManage;
