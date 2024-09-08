

import AllNews from "./pages/AllNews";
import Landing from "./pages/landing"
import TopHeadlines from "./pages/Top-headlines"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import CountryNews from "./pages/CountryNews"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} /> {/* Default route */}
          <Route path="/all-news" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
