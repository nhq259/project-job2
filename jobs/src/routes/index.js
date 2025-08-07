import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Search from "../pages/Search";
import JobDetail from "../pages/JobDetail";
import Company from "../pages/Company";
import CompanyDetail from "../pages/Company/CompanyDetail";
import LayoutAdmin from "../layout/LayoutAdmin";
import Dashboard from "../pages/Dashboard";
import InfoCompany from "../pages/InfoCompany";
import JobManage from "../pages/JobManage";
import CreateJob from "../pages/JobManage/CreateJob";
import DetailJob from "../pages/JobManage/DetailJob";
import EditJob from "../pages/JobManage/EditJob";
import CVManage from "../pages/CVManage";
import CVDetail from "../pages/CVManage/CVDetail";

export const routes = [
  // Các route sử dụng LayoutDefault
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "jobs/:id",
        element: <JobDetail />
      },
      {
        path: "company",
        element: <Company />
      },
      {
        path: "company/:id",
        element: <CompanyDetail />
      },
    ]
  },

  // Các route sử dụng LayoutAdmin, yêu cầu xác thực quyền truy cập
  {
    element: <PrivateRoutes />, // Kiểm tra quyền truy cập admin
    children: [
      {
      
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <Dashboard />
          },
          {
            path: "info-company",
            element: <InfoCompany />
          },
          {
            path: "job-manage",
            element: <JobManage />
          },
          {
            path: "create-job",
            element: <CreateJob />
          },
          {
            path: "detail-job/:id",
            element: <DetailJob />
          },
          {
            path: "edit-job/:id",
            element: <EditJob />
          },
          {
            path: "cv-manage",
            element: <CVManage />
          },
          {
            path: "detail-cv/:id",
            element: <CVDetail />
          },
        ]
      }
    ]
  }
];
