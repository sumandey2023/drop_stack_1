// ImageKit URL utilities
export const getImageKitUrl = (url, options = {}) => {
  if (!url) return "";

  // If it's already a full URL, return as is
  if (url.startsWith("http")) {
    return url;
  }

  // If it's a relative path, construct the full URL
  const baseUrl = "https://ik.imagekit.io/oruoqrvqm";
  return `${baseUrl}${url}`;
};

// Get optimized image URL for display
export const getOptimizedImageUrl = (url, width = 300, height = 300) => {
  const baseUrl = getImageKitUrl(url);
  if (!baseUrl) return "";

  // Add ImageKit transformation parameters
  const params = new URLSearchParams({
    tr: `w-${width},h-${height},c-at_max`,
    fo: "auto",
  });

  return `${baseUrl}?${params.toString()}`;
};

// Get thumbnail URL
export const getThumbnailUrl = (url) => {
  return getOptimizedImageUrl(url, 200, 200);
};

// Check if URL is accessible
export const checkUrlAccessibility = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error("URL accessibility check failed:", error);
    return false;
  }
};
