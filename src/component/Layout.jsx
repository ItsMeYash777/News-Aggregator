// Layout.jsx
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const Layout = ({ theme, toggleTheme }) => {
  // Apply theme class to document root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="bg-white dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-300">
        <Outlet /> 
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default Layout;
