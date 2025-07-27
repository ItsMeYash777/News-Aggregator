
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ theme }) => {
  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img className="w-10 h-10 mr-3" src="28267842_7.svg" alt="NewsHub Logo" />
              <span className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                NewsHub
              </span>
            </div>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 max-w-md leading-relaxed">
              Your trusted source for comprehensive, real-time news coverage from around the world. 
              Stay informed, stay connected with what matters most.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ItsMeYash777"
                className="p-2 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-700 dark:hover:text-primary-400 hover:bg-surface-light dark:hover:bg-primary-800 transition-all duration-200"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/yash-solanki-8879a7250/"
                className="p-2 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-700 dark:hover:text-primary-400 hover:bg-surface-light dark:hover:bg-primary-800 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-700 dark:hover:text-primary-400 hover:bg-surface-light dark:hover:bg-primary-800 transition-all duration-200"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/all-news"
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  All News
                </Link>
              </li>
              <li>
                <Link 
                  to="/nyt" 
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  NY Times
                </Link>
              </li>
              <li>
                <Link 
                  to="/top-headlines/general"
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  Top Headlines
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:yashworks77@gmail.com" 
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Us
                </a>
              </li>
              <li className="text-text-secondary-light dark:text-text-secondary-dark">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Global Coverage
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border-light dark:border-border-dark">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4 md:mb-0">
              © 2024 NewsHub. All rights reserved. Built with ❤️ for news enthusiasts.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                Theme: {theme === 'dark' ? '🌙 Dark' : '☀️ Light'} Mode
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
