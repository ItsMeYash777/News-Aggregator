
import {  FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Navigation Links */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Navigation</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/nyt" className="hover:underline">
                  NY Times
                </Link>
              </li>
              <li>
                <Link to="/all-news">All-News</Link>
              </li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Contact Me</h3>
            <ul className="space-y-1">
              <li>
                Email:{" "}
                <a href="mailto:info@example.com" className="hover:underline">
                  yashworks77@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ItsMeYash777"
                className="text-gray-400 hover:text-white"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/yash-solanki-8879a7250/"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm">© 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
