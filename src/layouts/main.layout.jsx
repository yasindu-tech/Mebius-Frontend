import Footer from "@/components/footer";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Toaster />
      <Footer />


    </>
  );
}

export default MainLayout;
