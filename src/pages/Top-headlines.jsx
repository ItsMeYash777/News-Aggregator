import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../component/NewsCard";

function TopHeadlines() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  function handlePrev() {
    setPage(page - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNext() {
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let pageSize = 6;

  // Format category name for display
  const formatCategoryName = (category) => {
    return category ? category.charAt(0).toUpperCase() + category.slice(1) : 'General';
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const categoryParam = params.category ? `&category=${params.category}` : "";
    fetch(
      `${API_URL}/api/news/top-headlines?${categoryParam}&page=${page}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((json) => {
        if (json.success) {
          setTotalResults(json.data.totalResults);
          setData(json.data.articles);
        } else {
          setError(json.message || "An error occurred");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, params.category]);

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark sm:text-4xl lg:text-5xl mb-4">
              {formatCategoryName(params.category)} Headlines
            </h1>
            <p className="max-w-2xl mx-auto text-text-secondary-light dark:text-text-secondary-dark text-lg">
              Top breaking news and headlines in {formatCategoryName(params.category).toLowerCase()} from trusted sources.
            </p>
          </div>
        </div>
      </div>

      {/* Status Section */}
      {!isLoading && data.length > 0 && (
        <div className="py-4 border-b border-border-light dark:border-border-dark">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Showing page {page} of {Math.ceil(totalResults / pageSize)} • {totalResults.toLocaleString()} articles found
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
                <span className="text-red-700 dark:text-red-400 font-medium">Error Loading Headlines</span>
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
            data.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((element, index) => (
                  <NewsCard
                    key={index}
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    publishedAt={element.publishedAt}
                    url={element.url}
                    author={element.author}
                    source={element.source?.name}
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
                  No Headlines Found
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  No articles found for the {formatCategoryName(params.category).toLowerCase()} category at this time.
                </p>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800 dark:border-primary-300 mx-auto mb-4"></div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">Loading headlines...</p>
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
                disabled={page >= Math.ceil(totalResults / pageSize)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  page >= Math.ceil(totalResults / pageSize)
                    ? 'bg-surface-light dark:bg-primary-800 text-text-secondary-light dark:text-text-secondary-dark cursor-not-allowed'
                    : 'bg-primary-900 dark:bg-primary-100 text-white dark:text-primary-900 hover:bg-primary-800 dark:hover:bg-primary-200 transform hover:scale-105'
                }`}
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

export default TopHeadlines;
