import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const Latest = () => {
  const [loading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("world"); 
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
   const API_URL = import.meta.env.VITE_BACKEND_URL;

  const pageSize = 6

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
        console.log("Response data:", data); // Debugging response

        if (data.articles && Array.isArray(data.articles)) {
          setData(data.articles); // Set articles data // Set total results count
        } else {
          setError("Unexpected response format");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error); // Log errors
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page, pageSize]); // Fetches the data when the component mounts

  if (loading) {
    return (
      <section className="w-full py-16 md:py-24 bg-white dark:bg-background-dark transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800 dark:border-primary-300"></div>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Loading latest news...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-16 md:py-24 bg-white dark:bg-background-dark transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Unable to Load News
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-md">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-primary-800 dark:bg-primary-300 text-white dark:text-primary-900 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-400 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-background-dark transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark sm:text-4xl lg:text-5xl mb-4">
            Latest News
          </h2>
          <p className="max-w-3xl mx-auto text-text-secondary-light dark:text-text-secondary-dark text-lg">
            Stay updated with the most recent and relevant news articles from trusted sources around the world.
          </p>
        </div>
        
        <div className="mx-auto grid max-w-7xl items-start gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {data.length > 0 ? (
            data.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description}
                url={article.url}
                imageUrl={article.urlToImage}
                author={article.author}
                source={article.source?.name}
                publishedAt={article.publishedAt}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-surface-light dark:bg-surface-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-text-secondary-light dark:text-text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                No Articles Found
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                We couldn't find any articles at the moment. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Latest;
