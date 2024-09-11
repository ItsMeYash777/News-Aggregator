import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import countries from "./countries";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  let categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
    "politics",
  ];

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
    setIsCountryOpen(false);
  };

  const toggleCountry = () => {
    setIsCountryOpen(!isCountryOpen);
    setIsCategoryOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCategorySelect = (category) => {
    navigate(`/top-headlines/${category}`);
    setIsCategoryOpen(false);
  };

  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md p-4 flex  flex-col md:flex-row md:items-center md:justify-center relative">
      <div className="flex items-center justify-center w-full md:w-auto mb-4 md:mb-0">
        <img className="w-16" src="28267842_7.svg" alt="Logo" />
        <button
          className="md:hidden text-white bg-black rounded-full p-2 hover:bg-gray-800"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        className={`md:flex md:space-x-4 ${
          isMobileMenuOpen ? "flex" : "hidden"
        } flex-col md:flex-row mt-4 md:mt-0 md:justify-center`}
      >
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 md:justify-center">
          <li>
            <Link
              to="/"
              className={`hover:text-gray-800 ${
                isActive("/") ? "underline text-[#4158D0]" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/nyt"
              className={`hover:text-gray-800 ${
                isActive("/nyt") ? "underline text-[#4158D0]" : ""
              }`}
            >
              New York Times
            </Link>
          </li>
          <li>
            <Link
              to="/all-news"
              className={`hover:text-gray-800 ${
                isActive("/all-news") ? "underline text-[#4158D0]" : ""
              }`}
            >
              All-News
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={toggleCategory}
              className={`flex items-center focus:outline-none ${
                isActive("/top-headlines") ? "underline text-[#4158D0]" : ""
              }`}
            >
              Top-headlines
              <svg
                className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isCategoryOpen && (
              <ul className="absolute bg-white shadow-md mt-2 p-2 rounded-lg z-20 w-40">
                {categories.map((category, index) => (
                  <li key={index} className="px-4 py-2 hover:bg-gray-100">
                    <button
                      onClick={() => handleCategorySelect(category)}
                      className="w-full text-left"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              onClick={toggleCountry}
              className={`flex items-center focus:outline-none hover:text-gray-700 transition ${
                isActive("/country") ? "underline text-[#4158D0]" : ""
              }`}
            >
              Country
              <svg
                className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
                  isCountryOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isCountryOpen && (
              <ul className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-y-auto max-h-64 z-10 p-2">
                {countries.map((country, index) => (
                  <li key={index} onClick={() => setIsCountryOpen(false)}>
                    <Link
                      to={`/country/${country?.iso_2_alpha}`}
                      className="flex gap-3"
                      onClick={() => setActive(!active)}
                    >
                      <img
                        src={country?.png}
                        srcSet={`https://flagcdn.com/32x24/${country?.iso_2_alpha}.png`}
                        alt={country?.countryName}
                        className="w-6 h-4"
                      />
                      <span>{country?.countryName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
