import Navigation from "@/pages/admin/Navigation";
import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default AdminLayout;
