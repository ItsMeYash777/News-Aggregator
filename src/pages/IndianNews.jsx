import { useState, useEffect } from "react";
import NewsCard from "../component/NewsCard";

function IndianNews() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("published_at");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const pageSize = 12;

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch news when filters change
  useEffect(() => {
    fetchIndianNews();
  }, [page, selectedCategory, searchTerm, sortBy, sortOrder]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/news/indian-news/categories`);
      const result = await response.json();
      if (result.success) {
        setCategories(result.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchIndianNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        sortBy,
        sortOrder
      });

      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      if (searchTerm.trim()) {
        params.append('q', searchTerm.trim());
      }

      const response = await fetch(`${API_URL}/api/news/indian-news?${params}`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data.articles);
        setTotalResults(result.data.totalResults);
        setTotalPages(result.data.totalPages);
      } else {
        setError("Failed to fetch Indian news");
      }
    } catch (error) {
      console.error("Error fetching Indian news:", error);
      setError("Failed to fetch Indian news. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
    fetchIndianNews();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page when category changes
    setIsCategoryOpen(false);
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
    } else {
      setSortBy(newSortBy);
      setSortOrder("DESC");
    }
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSearchTerm("");
    setSortBy("published_time");
    setSortOrder("DESC");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background-dark transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-900/20 dark:to-green-900/20 border-b border-border-light dark:border-border-dark py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-3">🇮🇳</span>
              <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark sm:text-4xl lg:text-5xl">
                भारत समाचार
              </h1>
            </div>
            <p className="max-w-2xl mx-auto text-text-secondary-light dark:text-text-secondary-dark text-lg">
              भारत की ताज़ा खबरें, राज्यवार समाचार और विश्वसनीय स्रोतों से अपडेट्स पाएं
            </p>
            <p className="max-w-2xl mx-auto text-text-secondary-light dark:text-text-secondary-dark text-sm mt-2">
              Latest news from India, state-wise updates and trusted sources
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="समाचार खोजें... / Search news..."
                className="flex-1 px-4 py-2 border border-border-light dark:border-border-dark rounded-l-lg bg-white dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-r-lg transition-colors duration-200 flex items-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center px-4 py-2 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-text-primary-light dark:text-text-primary-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors duration-200"
                >
                  <span>{selectedCategory || "All Categories"}</span>
                  <svg className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-surface-dark shadow-lg border border-border-light dark:border-border-dark rounded-lg z-20 max-h-64 overflow-y-auto">
                    <div className="p-2">
                      <button
                        onClick={() => handleCategoryChange("")}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                          !selectedCategory 
                            ? "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" 
                            : "hover:bg-surface-light dark:hover:bg-primary-800"
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => handleCategoryChange(category.name)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex justify-between items-center ${
                            selectedCategory === category.name 
                              ? "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" 
                              : "hover:bg-surface-light dark:hover:bg-primary-800 text-text-primary-light dark:text-text-primary-dark"
                          }`}
                        >
                          <span className="capitalize">{category.name.replace(/-/g, ' ')}</span>
                          <span className="text-xs bg-primary-100 dark:bg-primary-800 px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Sort:</span>
                <button
                  onClick={() => handleSortChange("published_time")}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                    sortBy === "published_time" 
                      ? "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" 
                      : "bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary-100 dark:hover:bg-primary-800"
                  }`}
                >
                  Date {sortBy === "published_time" && (sortOrder === "DESC" ? "↓" : "↑")}
                </button>
                <button
                  onClick={() => handleSortChange("title")}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                    sortBy === "title" 
                      ? "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300" 
                      : "bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary-100 dark:hover:bg-primary-800"
                  }`}
                >
                  Title {sortBy === "title" && (sortOrder === "DESC" ? "↓" : "↑")}
                </button>
              </div>

              {/* Clear Filters */}
              {(selectedCategory || searchTerm || sortBy !== "published_time" || sortOrder !== "DESC") && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory || searchTerm) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm flex items-center">
                  Category: {selectedCategory}
                  <button
                    onClick={() => handleCategoryChange("")}
                    className="ml-2 hover:text-orange-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm flex items-center">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results Info */}
      {!isLoading && (
        <div className="py-4 border-b border-border-light dark:border-border-dark">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Showing page {page} of {totalPages} • {totalResults.toLocaleString()} articles found
                {selectedCategory && ` in ${selectedCategory}`}
                {searchTerm && ` for "${searchTerm}"`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 dark:text-red-400 font-medium">Error Loading News</span>
              </div>
              <p className="text-red-600 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">Loading भारत समाचार...</p>
              </div>
            </div>
          ) : data.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((article, index) => (
                <NewsCard
                  key={index}
                  title={article.title}
                  description={null}
                  url={article.link}
                  imageUrl={article.image}
                  author={article.author}
                  source={article.source}
                  publishedAt={article.published_time}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-surface-light dark:bg-surface-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                No Articles Found
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                {searchTerm || selectedCategory 
                  ? "No articles match your current filters. Try adjusting your search criteria."
                  : "No Indian news articles are available at the moment."
                }
              </p>
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && data.length > 0 && totalPages > 1 && (
        <div className="py-8 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={page <= 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  page <= 1
                    ? 'bg-surface-light dark:bg-primary-800 text-text-secondary-light dark:text-text-secondary-dark cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700 transform hover:scale-105'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-text-primary-light dark:text-text-primary-dark font-semibold">
                  Page {page} of {totalPages}
                </span>
              </div>

              <button
                onClick={handleNextPage}
                disabled={page >= totalPages}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  page >= totalPages
                    ? 'bg-surface-light dark:bg-primary-800 text-text-secondary-light dark:text-text-secondary-dark cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700 transform hover:scale-105'
                }`}
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

export default IndianNews; 
