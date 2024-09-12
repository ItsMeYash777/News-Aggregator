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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="w-full py-8 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter text-[#4158D0] sm:text-4xl lg:text-5xl">
              Latest News
            </h2>
            <p className="max-w-[90%] md:max-w-[900px] text-muted-foreground text-base md:text-xl">
              Explore the most recent and relevant news articles from trusted
              sources.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl items-start gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {data.length > 0 ? (
            data.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description}
                url={article.url}
                imageUrl={article.urlToImage}
              />
            ))
          ) : (
            <p className="text-center col-span-full">No articles found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Latest;
