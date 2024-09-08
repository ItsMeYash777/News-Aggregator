import { useState } from "react";
import {Link} from "react-router-dom"
import countries from "./countries";
import { useNavigate } from "react-router-dom";
import SignInSignUpModal from "./SignInSignUpModal";
import "../App.css";


const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
   const [isSignUp, setIsSignUp] = useState(false);
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
    setIsCountryOpen(false); // Close country dropdown when category opens
  };

  const toggleCountry = () => {
    setIsCountryOpen(!isCountryOpen);
    setIsCategoryOpen(false); // Close category dropdown when country opens
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

const handleCountrySelect = (isoCode) => {
  navigate(`/top-headlines?country=${isoCode}`);
  setIsCountryOpen(false); // Close the dropdown after selection
};

  const openModal = (signUp) => {
    setIsSignUp(signUp);
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <nav className="bg-white shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between relative">
      <div className="flex items-center justify-between w-full md:w-auto">
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
        } flex-col md:flex-row mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 relative">
          <li>
            <Link to="/all-news" className="hover:text-gray-800">
            All-News
            </Link>
           
          </li>
          <li className="relative">
            <button
              onClick={toggleCategory}
              className="flex items-center focus:outline-none"
            >
              <Link to="/top-headlines" className="hover:text-gray-800">
                Top-headlines
              </Link>
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
                    <Link
                      to={"/top-headlines/" + category}
                      className="flex gap-3 capitalize"
                      type="btn"
                      onClick={() => {
                        setIsActive(!isActive);
                      }}
                    ></Link>
                    <a href="#">{category}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              onClick={toggleCountry}
              className="flex items-center focus:outline-none"
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
              <ul className="absolute bg-white shadow-md mt-2 p-2 rounded-lg max-h-64 overflow-y-auto z-20 w-64">
                {countries.map((country, index) => (
                  <li
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <img
                      src={country.png}
                      alt={`${country.countryName} flag`}
                      className="w-6 h-4 mr-2"
                    />
                    <button
                      onClick={() => handleCountrySelect(country.iso)}
                      className="text-gray-700 focus:outline-none"
                    >
                      {country.countryName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile buttons */}
        <div className="md:hidden mt-4 space-y-2">
          <button
            onClick={() => openModal(true)}
            className="w-full text-white bg-black rounded-full px-5 py-2 hover:bg-gray-800"
          >
            Sign Up!
          </button>
          <button
            onClick={() => openModal(false)}
            className="w-full text-white bg-black rounded-full px-5 py-2 hover:bg-gray-800"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Desktop buttons */}
      <div className="hidden md:flex space-x-4 mt-4 md:mt-0">
        <button
          onClick={() => openModal(true)}
          className="text-white bg-black rounded-full px-5 py-2 hover:bg-gray-800"
        >
          Sign Up!
        </button>
        <button
          onClick={() => openModal(false)}
          className="text-white bg-black rounded-full px-5 py-2 hover:bg-gray-800"
        >
          Sign In
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <SignInSignUpModal
          isSignUp={isSignUp}
          closeModal={closeModal} // Close modal handler
        />
      )}
    </nav>
  );
};

export default Navbar;
