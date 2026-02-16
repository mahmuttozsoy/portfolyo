import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin">
          <Route index element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="projects" element={<div>Projects Management (TODO)</div>} />
            <Route path="messages" element={<div>Messages (TODO)</div>} />
            <Route path="skills" element={<div>Skills (TODO)</div>} />
            <Route path="experience" element={<div>Experience (TODO)</div>} />
            <Route path="education" element={<div>Education (TODO)</div>} />
            <Route path="profile" element={<div>Profile (TODO)</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
