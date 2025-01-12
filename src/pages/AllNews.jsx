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
  }

  function handleNext() {
    setPage((nextPage) => nextPage + 1);
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
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 ">
        {!isLoading ? (
          data.map((element, index) => (
            <NewsCard
              title={element.title}
              description={element.description}
              imgUrl={element.urlToImage}
              publishedAt={element.publishedAt}
              url={element.url}
              author={element.author}
              source={element.source.name}
              key={index}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>

      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn text-center"
            onClick={handlePrev}
          >
            &larr; Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className="pagination-btn text-center"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default AllNews;
