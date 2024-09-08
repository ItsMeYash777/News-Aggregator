// Layout.jsx
import Navbar from "./Navbar"; // Import your Navbar component
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* This will render the content for the current route */}
      </main>
    </div>
  );
};

export default Layout;
