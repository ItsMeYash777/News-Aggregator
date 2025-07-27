import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

const TopNews = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [news, setNews] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${API_URL}/api/news/nyt?page=${currentPage}`
        );
        setNews(response.data.results || []); 
        setTotalPages(response.data.totalPages || 1); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to fetch news. Please try again later.");
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="https://logo.clearbit.com/nytimes.com" 
                alt="New York Times" 
                className="w-12 h-12 mr-4 rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark sm:text-4xl lg:text-5xl">
                New York Times
              </h1>
            </div>
            <p className="max-w-2xl mx-auto text-text-secondary-light dark:text-text-secondary-dark text-lg">
              Premium news coverage from The New York Times. Quality journalism you can trust.
            </p>
          </div>
        </div>
      </div>

      {/* Status Section */}
      {!loading && news.length > 0 && (
        <div className="py-4 border-b border-border-light dark:border-border-dark">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Page {currentPage} of {totalPages} • New York Times Premium Content
              </span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 dark:text-red-400 font-medium">Error Loading News</span>
              </div>
              <p className="text-red-600 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800 dark:border-primary-300 mx-auto mb-4"></div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">Loading New York Times articles...</p>
              </div>
            </div>
          ) : news.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {news.map((article, index) => (
                <NewsCard
                  key={index}
                  title={article.title}
                  description={article.abstract}
                  url={article.url}
                  imageUrl={article.multimedia?.[0]?.url}
                  source="The New York Times"
                  publishedAt={article.published_date}
                  author={article.byline}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-surface-light dark:bg-surface-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-text-secondary-light dark:text-text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                No Articles Available
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                No New York Times articles are available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!loading && news.length > 0 && (
        <div className="py-8 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-surface-light dark:bg-primary-800 text-text-secondary-light dark:text-text-secondary-dark cursor-not-allowed'
                    : 'bg-primary-900 dark:bg-primary-100 text-white dark:text-primary-900 hover:bg-primary-800 dark:hover:bg-primary-200 transform hover:scale-105'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-text-primary-light dark:text-text-primary-dark font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-surface-light dark:bg-primary-800 text-text-secondary-light dark:text-text-secondary-dark cursor-not-allowed'
                    : 'bg-primary-900 dark:bg-primary-100 text-white dark:text-primary-900 hover:bg-primary-800 dark:hover:bg-primary-200 transform hover:scale-105'
                }`}
              >
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNews;
 