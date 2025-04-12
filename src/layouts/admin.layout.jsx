import Navigation from "@/pages/admin/Navigation";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
function AdminLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Toaster />
    </>
  );
}

export default AdminLayout;
