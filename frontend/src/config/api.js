// API Configuration
const API_CONFIG = {
  // Base URL for all API calls
  BASE_URL:
    process.env.NODE_ENV === "production"
      ? "https://drop-stack-1.onrender.com"
      : "http://localhost:3000",

  // API endpoints
  ENDPOINTS: {
    UPLOAD_FILES: "/upload/uploadFiles",
    GET_FILES: "/get/getFiles",
    DELETE_FILE: "/files",
    DOWNLOAD_FILE: "/files/download",
  },

  // Request timeout (in milliseconds)
  TIMEOUT: 30000,

  // Default headers
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get upload URL
export const getUploadUrl = () => {
  return getApiUrl(API_CONFIG.ENDPOINTS.UPLOAD_FILES);
};

// Export the config for use in other files
export default API_CONFIG;
