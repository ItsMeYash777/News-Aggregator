import AllNews from "./pages/AllNews";
import Landing from "./pages/landing";
import TopHeadlines from "./pages/Top-headlines";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import CountryNews from "./pages/CountryNews";
import TopNews from "./component/TopNews";
import { useState, useEffect } from "react";

const App = () => {
  const [theme, setTheme] = useState("light"); // Light theme by default

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Apply theme when it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout theme={theme} toggleTheme={toggleTheme} />} // Pass theme and toggle function
        >
          <Route index element={<Landing />} /> {/* Default route */}
          <Route path="/india-news" element={<AllNews />} />
          <Route path="/all-news" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
          <Route path="/nyt" element={<TopNews />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
