import CVStatistic from "./CVStatistic";
import InfoCompany from "./InfoCompany";
import JobStatistic from "./JobStatistic";
import "./Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Tổng quan</h1>
            <div className="dashboard-content">
                <JobStatistic />
                <CVStatistic />
                <InfoCompany />
            </div>
        </div>
    );
}

export default Dashboard;
