import React, { useState, useEffect } from "react";

const News = () => {
  const [articles, setArticles] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    // Fetch articles from your backend API
    fetch("http://localhost:5000/api/news")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Check the structure of the response
        setArticles(data || []); // Directly set data if it's an array
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError(error.message); // Set error message to state
      });
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>} {/* Display error if any */}
      {Array.isArray(articles) && articles.length > 0 ? (
        articles.map((article, index) => (
          <div key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
};

export default News;
