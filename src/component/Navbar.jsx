import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import countries from "./countries";
import "../App.css";

const Navbar = ({ theme, toggleTheme }) => {
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
    <nav className="bg-white dark:bg-surface-dark shadow-md border-b border-border-light dark:border-border-dark p-4 flex flex-col md:flex-row md:items-center md:justify-between relative transition-colors duration-300">
      <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
        <div className="flex items-center">
          <img className="w-12 h-12 mr-3" src="28267842_7.svg" alt="Logo" />
          <span className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
            NewsHub
          </span>
        </div>
        
        <div className="flex items-center gap-4 ml-5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-primary-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6 text-text-primary-light dark:text-text-primary-dark"
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
      </div>

      <div
        className={`md:flex md:space-x-6 ${
          isMobileMenuOpen ? "flex" : "hidden"
        } flex-col md:flex-row mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <li>
            <Link
              to="/"
              className={`font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 ${
                isActive("/") 
                  ? "text-primary-800 dark:text-primary-300 border-b-2 border-primary-800 dark:border-primary-300" 
                  : "text-text-primary-light dark:text-text-primary-dark"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/nyt"
              className={`font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 ${
                isActive("/nyt") 
                  ? "text-primary-800 dark:text-primary-300 border-b-2 border-primary-800 dark:border-primary-300" 
                  : "text-text-primary-light dark:text-text-primary-dark"
              }`}
            >
              New York Times
            </Link>
          </li>
          <li>
            <Link
              to="/all-news"
              className={`font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 ${
                isActive("/all-news") 
                  ? "text-primary-800 dark:text-primary-300 border-b-2 border-primary-800 dark:border-primary-300" 
                  : "text-text-primary-light dark:text-text-primary-dark"
              }`}
            >
              All News
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={toggleCategory}
              className={`flex items-center font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none ${
                location.pathname.includes("/top-headlines") 
                  ? "text-primary-800 dark:text-primary-300" 
                  : "text-text-primary-light dark:text-text-primary-dark"
              }`}
            >
              Categories
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
              <ul className="absolute bg-white dark:bg-surface-dark shadow-lg border border-border-light dark:border-border-dark mt-2 p-2 rounded-lg z-20 w-40 animate-slide-up">
                {categories.map((category, index) => (
                  <li key={index} className="px-4 py-2 hover:bg-surface-light dark:hover:bg-primary-800 rounded-lg transition-colors duration-200">
                    <button
                      onClick={() => handleCategorySelect(category)}
                      className="w-full text-left text-text-primary-light dark:text-text-primary-dark capitalize"
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
              className={`flex items-center font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none ${
                location.pathname.includes("/country") 
                  ? "text-primary-800 dark:text-primary-300" 
                  : "text-text-primary-light dark:text-text-primary-dark"
              }`}
            >
              Countries
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
              <ul className="absolute left-0 mt-2 w-64 bg-white dark:bg-surface-dark shadow-lg border border-border-light dark:border-border-dark rounded-lg overflow-y-auto max-h-64 z-10 p-2 animate-slide-up">
                {countries.map((country, index) => (
                  <li key={index} onClick={() => setIsCountryOpen(false)} className="hover:bg-surface-light dark:hover:bg-primary-800 rounded-lg transition-colors duration-200">
                    <Link
                      to={`/country/${country?.iso_2_alpha}`}
                      className="flex gap-3 p-2 text-text-primary-light dark:text-text-primary-dark"
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
