import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/login";
import DefaultLayout from "./Components/SideBar/DefaultLayout";
import Category from "./Components/AI_category/create_category"
import SignUp from "./Components/SingUp/singup"
import Chart from "./Components/DashBoard/linechart"
import Dashboard from "./Components/DashBoard/Dashboard";
import All_categories from "./Components/AI_category/all_categories";
import Edit_assistant from "./Components/AI_category/edit_assistant";
import Praises from "./Components/Praises/Praises";
import Users from "./Components/Users/Users";
import Faq from "./Components/Faq/Faq";
import Worktime from "./Components/Worktime/Worktime";
import Wellness from "./Components/Wellness/Wellness";
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/category_create" element={<DefaultLayout><Category /></DefaultLayout>} />

      <Route path="/categories" element={<DefaultLayout><All_categories /></DefaultLayout>} />

      <Route path="/categories/:id" element={<DefaultLayout>< Edit_assistant /></DefaultLayout>} />

      <Route path="/praises" element={<DefaultLayout><Praises /></DefaultLayout>} />

      <Route path="/users" element={<DefaultLayout><Users /></DefaultLayout>} />

      <Route path="/worktime" element={<DefaultLayout><Worktime /></DefaultLayout>} />

      <Route path="/wellness" element={<DefaultLayout><Wellness /></DefaultLayout>} />

      <Route path="/faq" element={<DefaultLayout><Faq /></DefaultLayout>} />

      <Route path="/another-route" element={<DefaultLayout><div>ne 123</div></DefaultLayout>} />

      <Route path="/singup" element={<SignUp />} />

      <Route path="/dashboard" element={<DefaultLayout><Dashboard /></DefaultLayout>} />

      <Route path="*" element={<DefaultLayout><div>No such directory</div></DefaultLayout>} />
    </Routes>
  );
};



export default Routing;
