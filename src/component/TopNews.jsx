import  { useEffect, useState } from "react";
import axios from "axios";


const NewsCard = ({ title, description, url, imageUrl }) => {
  return (
    <div className="flex flex-col bg-white border rounded-lg shadow-lg overflow-hidden max-w-xs h-full my-6 mx-1">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-[#4158D0] truncate">{title}</h3>
        <p className="text-sm text-gray-700 flex-grow overflow-hidden truncate">
          {description || "No description available."}
        </p>
        <a
          href={url}
          className="mt-auto inline-flex items-center justify-center rounded-md bg-[#4158D0] px-4 py-2 text-sm font-medium text-white shadow hover:bg-opacity-90"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

const TopNews = () => {
  const [news, setNews] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/news/nyt?page=${currentPage}`
        );
        setNews(response.data.results || []); 
        setTotalPages(response.data.totalPages || 1); 
        setLoading(false);
      } catch (error) {
        setError( error("error Fetching news"));
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Top News</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {news.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              description={article.abstract}
              url={article.url}
              imageUrl={article.multimedia?.[0]?.url}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
        >
          Previous
        </button>
        <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TopNews;
 