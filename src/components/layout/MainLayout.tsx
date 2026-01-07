import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
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
