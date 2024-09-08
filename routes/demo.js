const axios = require("axios");

// API credentials and input parameters
const apiKey =
  "170d20f6-cf0e-4ddb-9b8f-909efe88ccda:886388e6-b744-430f-92a7-c9ace18abb71";
const teamId = "85e8438d-8d1d-4853-8cbd-269ef174b967";
const robotId = "6a944a30-1115-4b3b-8ce2-bdae0ed0682b";

// Input parameters for the robot
const inputParameters = {
  originUrl: "https://www.ndtv.com/india", // Use the actual origin URL here
  india_news_headlines_limit: 5,
  news_headlines_limit: 10,
  india_news_articles_limit: 8,
};

// Define the Browse AI API endpoint
const browseAiUrl = `https://api.browse.ai/v2/teams/${teamId}/robots/${robotId}/run`;

// Make the request to Browse AI API
async function fetchDataFromBrowseAi() {
  try {
    const response = await axios.post(
      browseAiUrl,
      {
        inputs: inputParameters, // Robot input parameters
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Log the data received from the Browse AI API
    console.log("Browse AI Data:", response.data);
  } catch (error) {
    console.error("Error fetching data from Browse AI:", error);
  }
}

// Call the function to fetch data
fetchDataFromBrowseAi();
