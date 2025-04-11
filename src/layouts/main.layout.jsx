import Footer from "@/components/footer";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
