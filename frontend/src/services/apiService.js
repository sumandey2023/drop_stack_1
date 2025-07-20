import axios from "axios";
import API_CONFIG, { getApiUrl, getUploadUrl } from "../config/api";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

// Request interceptor for adding auth tokens, etc.
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access");
    } else if (error.response?.status === 500) {
      // Handle server errors
      console.error("Server error occurred");
    }
    return Promise.reject(error);
  }
);

// API Service functions
export const apiService = {
  // File upload
  uploadFiles: async (formData) => {
    try {
      const response = await apiClient.post(
        API_CONFIG.ENDPOINTS.UPLOAD_FILES,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all files
  getFiles: async () => {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.GET_FILES);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a file
  deleteFile: async (fileId) => {
    try {
      const response = await apiClient.delete(
        `${API_CONFIG.ENDPOINTS.DELETE_FILE}/${fileId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Download a file
  downloadFile: async (fileId) => {
    try {
      const response = await apiClient.get(
        `${API_CONFIG.ENDPOINTS.DOWNLOAD_FILE}/${fileId}`,
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Export the axios instance for direct use if needed
export { apiClient };

// Export helper functions
export { getApiUrl, getUploadUrl };
