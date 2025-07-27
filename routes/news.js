const express = require("express");
const axios = require("axios");
const pool = require("../config/database");
const router = express.Router();

// Helper function to get India-specific categories
const getIndianCategories = () => {
  return [
    'ai',
    'andhra-pradesh-news',
    'apps',
    'astrology',
    'audio',
    'auto',
    'bangalore-news',
    'bhubaneshwar-news',
    'business',
    'business-news',
    'chess',
    'cities',
    'cities/kolkata-news',
    'cities/lucknow-news',
    'city',
    'cricket',
    'delhi-news',
    'education',
    'education/exam-results',
    'england-vs-india-2025',
    'entertainment',
    'entertainment/bollywood',
    'entertainment/tamil-cinema',
    'entertainment/telugu-cinema',
    'entertainment/tv',
    'etimes',
    'feature',
    'festivals',
    'food',
    'food-drinks',
    'football',
    'gadgets-news',
    'games',
    'ghaziabad-news',
    'health',
    'home',
    'how-to',
    'htcity',
    'hyderabad-news',
    'india',
    'india-news',
    'infographic',
    'international',
    'internet',
    'karnataka-news',
    'kerala-news',
    'laptops',
    'life-style',
    'lifestyle',
    'lists',
    'mobiles',
    'mumbai-news',
    'news',
    'offbeat',
    'opinions',
    'reviews',
    'science',
    'social-networking',
    'sports',
    'table-tennis',
    'tablets',
    'tamil-nadu-news',
    'technology',
    'telangana-news',
    'toi-plus',
    'trending',
    'tv',
    'wearables',
    'web-series',
    'weight-loss',
    'world',
    'world-news',
    'wwe'
  ];
};

// Endpoint to fetch all-news
router.get("/all-news", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 10; // Fixed default pageSize for consistency
  let page = parseInt(req.query.page) || 1;
  let query = req.query.q || "world"; 
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API}`
    );
     res.json({
       success: true,
       totalResults: response.data.totalResults,
       articles: response.data.articles,
       currentPage: page,
       pageSize: pageSize,
       totalPages: Math.ceil(response.data.totalResults / pageSize)
     });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all news" });
  }
});

// Endpoint to fetch top-headlines
router.get("/top-headlines", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 10; // Fixed default pageSize for consistency
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
        currentPage: page,
        pageSize: pageSize,
        totalPages: Math.ceil(response.data.totalResults / pageSize)
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Error fetching top headlines" });
  }
});

//Endpoint for Newyork times data
router.get("/nyt", async (req, res) => {
   const { page = 1, pageSize = 10 } = req.query; // Fixed default pageSize for consistency

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
       currentPage: parseInt(page),
       pageSize: parseInt(pageSize),
       totalResults: articles.length,
       totalPages: Math.ceil(articles.length / Number(pageSize)),
     });
   } catch (error) {
     console.error("Error fetching news:", error);
     res.status(500).json({ message: "Error fetching top headlines" });
   }
});

// Endpoint to fetch country-specific news
router.get("/country/:iso", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 10; // Fixed default pageSize for consistency
  let page = parseInt(req.query.page) || 1;
  const country = req.params.iso;  // Getting the country ISO code from the URL

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API}`
    );
    res.json({
      success: true,
      articles: response.data.articles,
      totalResults: response.data.totalResults,
      currentPage: page,
      pageSize: pageSize,
      totalPages: Math.ceil(response.data.totalResults / pageSize)
    });
  } catch (error) { 
    res.status(500).json({ message: "Error fetching top headlines" });
  }
});

// UPDATED INDIAN NEWS ENDPOINTS

// Endpoint to fetch Indian news categories (filtered for India-specific only)
router.get("/indian-news/categories", async (req, res) => {
  try {
    const indianCategories = getIndianCategories();
    
    // Get categories that exist in database and are India-specific
    const query = `
      SELECT DISTINCT category, COUNT(*) as article_count 
      FROM indian_news 
      WHERE category = ANY($1)
      GROUP BY category 
      ORDER BY category
    `;
    const result = await pool.query(query, [indianCategories]);
    
    res.json({
      success: true,
      categories: result.rows.map(row => ({
        name: row.category,
        count: parseInt(row.article_count)
      })),
      totalCategories: result.rows.length
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// Updated main endpoint to fetch Indian news with enhanced filtering
router.get("/indian-news", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const category = req.query.category;
  const searchTerm = req.query.q;
  const sortBy = req.query.sortBy || 'published_at'; // published_at, title, category
  const sortOrder = req.query.sortOrder || 'DESC'; // ASC, DESC
  const offset = (page - 1) * pageSize;
  
  const indianCategories = getIndianCategories();

  try {
    let whereConditions = ['category = ANY($1)'];
    let queryParams = [indianCategories];
    let paramIndex = 2;

    // Add category filter if specified
    if (category && indianCategories.includes(category)) {
      whereConditions = ['category = $2'];
      queryParams = [indianCategories, category];
      paramIndex = 3;
    }

    // Add search filter if specified
    if (searchTerm) {
      whereConditions.push(`(title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`);
      queryParams.push(`%${searchTerm}%`);
      paramIndex++;
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM indian_news WHERE ${whereClause}`;
    const countResult = await pool.query(countQuery, queryParams);
    const totalResults = parseInt(countResult.rows[0].count);

    // Get paginated results
    queryParams.push(pageSize, offset);
    const dataQuery = `
      SELECT * FROM indian_news 
      WHERE ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    
    const result = await pool.query(dataQuery, queryParams);

    res.json({
      success: true,
      data: {
        articles: result.rows,
        totalResults: totalResults,
        currentPage: page,
        pageSize: pageSize,
        totalPages: Math.ceil(totalResults / pageSize),
        category: category || "all",
        searchTerm: searchTerm || null,
        sortBy: sortBy,
        sortOrder: sortOrder
      }
    });
  } catch (error) {
    console.error("Error fetching Indian news:", error);
    res.status(500).json({ message: "Error fetching Indian news" });
  }
});

// Endpoint to fetch news by specific category (with validation)
router.get("/indian-news/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const sortBy = req.query.sortBy || 'published_at';
  const sortOrder = req.query.sortOrder || 'DESC';
  const offset = (page - 1) * pageSize;

  const indianCategories = getIndianCategories();

  // Validate category
  if (!indianCategories.includes(categoryName)) {
    return res.status(400).json({ 
      success: false,
      message: "Invalid category. Category not found in Indian news categories.",
      availableCategories: indianCategories.slice(0, 10) // Show first 10 as sample
    });
  }

  try {
    // Get total count for the category
    const countQuery = 'SELECT COUNT(*) FROM indian_news WHERE category = $1';
    const countResult = await pool.query(countQuery, [categoryName]);
    const totalResults = parseInt(countResult.rows[0].count);

    // Get paginated results
    const query = `
      SELECT * FROM indian_news 
      WHERE category = $1 
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [categoryName, pageSize, offset]);

    res.json({
      success: true,
      data: {
        articles: result.rows,
        totalResults: totalResults,
        currentPage: page,
        pageSize: pageSize,
        totalPages: Math.ceil(totalResults / pageSize),
        category: categoryName,
        sortBy: sortBy,
        sortOrder: sortOrder
      }
    });
  } catch (error) {
    console.error("Error fetching Indian news by category:", error);
    res.status(500).json({ message: "Error fetching Indian news" });
  }
});

// Enhanced search endpoint for Indian news
router.get("/indian-news/search", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const searchTerm = req.query.q;
  const category = req.query.category;
  const sortBy = req.query.sortBy || 'published_at';
  const sortOrder = req.query.sortOrder || 'DESC';
  const offset = (page - 1) * pageSize;

  if (!searchTerm) {
    return res.status(400).json({ 
      success: false, 
      message: "Search term (q) is required" 
    });
  }

  const indianCategories = getIndianCategories();

  try {
    let whereConditions = ['category = ANY($1)', '(title ILIKE $2 OR description ILIKE $2)'];
    let queryParams = [indianCategories, `%${searchTerm}%`];
    let paramIndex = 3;

    // Add specific category filter if provided and valid
    if (category && indianCategories.includes(category)) {
      whereConditions = ['category = $1', '(title ILIKE $2 OR description ILIKE $2)'];
      queryParams = [category, `%${searchTerm}%`];
      paramIndex = 3;
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM indian_news WHERE ${whereClause}`;
    const countResult = await pool.query(countQuery, queryParams);
    const totalResults = parseInt(countResult.rows[0].count);

    // Get paginated results
    queryParams.push(pageSize, offset);
    const dataQuery = `
      SELECT * FROM indian_news 
      WHERE ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    const result = await pool.query(dataQuery, queryParams);

    res.json({
      success: true,
      data: {
        articles: result.rows,
        totalResults: totalResults,
        currentPage: page,
        pageSize: pageSize,
        totalPages: Math.ceil(totalResults / pageSize),
        searchTerm: searchTerm,
        category: category || "all",
        sortBy: sortBy,
        sortOrder: sortOrder
      }
    });
  } catch (error) {
    console.error("Error searching Indian news:", error);
    res.status(500).json({ message: "Error searching Indian news" });
  }
});

module.exports = router;
