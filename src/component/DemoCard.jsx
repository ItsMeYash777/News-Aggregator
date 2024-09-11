// src/NewsCard.js

import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
      <h2>{article.webTitle}</h2>
      <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
