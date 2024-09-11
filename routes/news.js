const express = require("express");
const axios = require("axios");
const router = express.Router();

// Endpoint to fetch all-news
router.get("/all-news", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 40;
  let page = parseInt(req.query.page) || 1;
  let query = req.query.q || "world"; 
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API}`
    );
     res.json({
       totalResults: response.data.totalResults,
       articles: response.data.articles,
     });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all news" });
  }
});




// Endpoint to fetch top-headlines

router.get("/top-headlines", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80 
  let page = parseInt(req.query.page) || 1
  let category = req.query.category || "general"
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API}`
    );
   res.json({
      success: true,
      data: {
        totalResults: response.data.totalResults,
        articles: response.data.articles,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Error fetching top headlines" });
  }
});

//Endpoint for Newyork times data

router.get("/nyt", async (req, res) => {
   const { page = 1, pageSize = 12 } = req.query;

   try {
     const response = await axios.get(
       `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NYT_API}`
     );
     const articles = response.data.results || [];

     // Pagination logic
     const startIndex = (page - 1) * pageSize;
     const paginatedArticles = articles.slice(
       startIndex,
       startIndex + Number(pageSize)
     );

     res.json({
       success: true,
       results: paginatedArticles,
       totalPages: Math.ceil(articles.length / Number(pageSize)),
     });
   } catch (error) {
     console.error("Error fetching news:", error);
     res.status(500).json({ message: "Error fetching top headlines" });
   }
});





// Endpoint to fetch country-specific news
router.get("/country/:iso", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  const country = req.params.iso;  // Getting the country ISO code from the URL

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API}`
    );
    res.json(response.data.articles);
  } catch (error) { 
    res.status(500).json({ message: "Error fetching top headlines" });
  }
});








module.exports = router;
