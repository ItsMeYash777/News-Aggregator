import { useState, useEffect } from "react";
import NewsCard from "../component/NewsCard";
import Loader from "../component/Loader";

function AllNews() {
  const [query, setQuery] = useState("world"); 
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const pageSize = 12;

  function handlePrev() {
    setPage((prevPage) => prevPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNext() {
    setPage((nextPage) => nextPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

 useEffect(() => {
   const params = new URLSearchParams({
     q: query,
     page,
     pageSize,
   }).toString();

   setIsLoading(true);
   setError(null);

   fetch(`${API_URL}/api/news/all-news?${params}`)
     .then((response) => {
       if (response.ok) {
         return response.json();
       }
       throw new Error("Network response was not ok");
     })
     .then((data) => {
       console.log("Response data:", data);

       if (data.articles && Array.isArray(data.articles)) {
         setData(data.articles);
         setTotalResults(data.totalResults);
       } else {
         setError("Unexpected response format");
       }
     })
     .catch((error) => {
       console.error("Fetch error:", error);
       setError("Failed to fetch news. Please try again later.");
     })
     .finally(() => {
       setIsLoading(false);
     });
 }, [query, page, pageSize]);

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark sm:text-4xl lg:text-5xl mb-4">
              All News
            </h1>
            <p className="max-w-2xl mx-auto text-text-secondary-light dark:text-text-secondary-dark text-lg">
              Comprehensive news coverage from trusted sources worldwide. Stay informed with the latest developments.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="py-6 border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <label htmlFor="search" className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                Search:
              </label>
              <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-4 py-2 border border-border-light dark:border-border-dark rounded-lg bg-white dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
                placeholder="Enter keywords..."
              />
            </div>
            
            {!isLoading && data.length > 0 && (
              <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Showing page {page} of {Math.ceil(totalResults / pageSize)} 
                <span className="ml-2">({totalResults.toLocaleString()} articles)</span>
              </div>
            )}
          </div>
        </div>
      </div>

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
          {!isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((element, index) => (
                <NewsCard
                  key={index}
                  title={element.title}
                  description={element.description}
                  url={element.url}
                  imageUrl={element.urlToImage}
                  publishedAt={element.publishedAt}
                  author={element.author}
                  source={element.source?.name}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800 dark:border-primary-300 mx-auto mb-4"></div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">Loading news articles...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && data.length > 0 && (
        <div className="py-8 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                disabled={page <= 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  page <= 1
                    ? 'bg-surface-light dark:bg-primary-800 text-text-secondary-light dark:text-text-secondary-dark cursor-not-allowed'
                    : 'bg-primary-900 dark:bg-primary-100 text-white dark:text-primary-900 hover:bg-primary-800 dark:hover:bg-primary-200 transform hover:scale-105'
                }`}
                onClick={handlePrev}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-text-primary-light dark:text-text-primary-dark font-semibold">
                  Page {page} of {Math.ceil(totalResults / pageSize)}
                </span>
              </div>

              <button
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  page >= Math.ceil(totalResults / pageSize)
                    ? 'bg-surface-light dark:bg-primary-800 text-text-secondary-light dark:text-text-secondary-dark cursor-not-allowed'
                    : 'bg-primary-900 dark:bg-primary-100 text-white dark:text-primary-900 hover:bg-primary-800 dark:hover:bg-primary-200 transform hover:scale-105'
                }`}
                disabled={page >= Math.ceil(totalResults / pageSize)}
                onClick={handleNext}
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
}

export default AllNews;
