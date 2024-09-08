import axios from "axios";

// Function to fetch top headlines from your server
export const fetchTopHeadlines = async (
  pageSize = 10,
  page = 1,
  country = "in"
) => {
  try {
    const response = await axios.get(`/country/${country}`, {
      // Use the actual country code
      params: {
        pageSize,
        page,
      },
    });
    return { articles: response.data }; // Adjust based on the actual response structure
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return { articles: [] }; // Return an empty array wrapped in an object
  }
};

