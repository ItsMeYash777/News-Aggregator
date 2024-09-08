import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NewsCard from "../component/NewsCard";
import Loader from "../component/Loader";

function CountryNews() {
  
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const countryIso = params.get("country");

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  const pageSize = 6;

 useEffect(() => {
   setIsLoading(true);
   setError(null);

   fetch(
     `http://localhost:5000/api/news/country/${countryIso}?page=${page}&pageSize=${pageSize}`
   )
     .then((response) => {
       if (response.ok) {
         return response.json();
       }
       throw new Error("Network response was not ok");
     })
     .then((data) => {
       setData(data);
       setTotalResults(data.totalResults);
     })
     .catch((error) => {
       setError("Failed to fetch news. Please try again later.");
       console.error("Fetch error:", error);
     })
     .finally(() => {
       setIsLoading(false);
     });
 }, [countryIso, page]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <NewsCard
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
              />
            ))
          ) : (
            <p>No news articles found for this criteria.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            className="pagination-btn"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default CountryNews;