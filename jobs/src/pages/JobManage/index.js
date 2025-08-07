import { Link } from "react-router-dom";
import JobList from "./JobList";

function JobManage() {
  return (
    <>
      <h1>Danh sách việc làm</h1>
      <Link to={`/create-job`}>
        <button>Tạo mới việc làm</button>
      </Link>
      <div>
        <JobList />
      </div>
    </>
  );
}

export default JobManage;
