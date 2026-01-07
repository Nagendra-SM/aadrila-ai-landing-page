import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  navbarVisible?: boolean;
}

const MainLayout = ({ navbarVisible = true }: MainLayoutProps) => {
  return (
    <>
      <Navbar visible={navbarVisible} />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <div id="contact">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
