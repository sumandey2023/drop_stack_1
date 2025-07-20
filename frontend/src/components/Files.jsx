import React, { useState, useEffect } from "react";
import {
  File,
  Download,
  Trash2,
  Calendar,
  Loader2,
  AlertCircle,
  Image,
  Video,
  FileText,
  Music,
  Archive,
  Eye,
} from "lucide-react";
import { apiService } from "../services/apiService";
import { getThumbnailUrl, getImageKitUrl } from "../utils/imagekit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageErrors, setImageErrors] = useState(new Set());
  const [activeMobileOverlay, setActiveMobileOverlay] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await apiService.getFiles();
      // console.log("Files response:", response);
      setFiles(response);
    } catch (err) {
      console.error("Error fetching files:", err);
      setError("Failed to load files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const baseUrl =
        "http://localhost:3000" || "https://drop-stack-1.onrender.com";
      const deleteUrl = `${baseUrl}/delete/deleteFile/${fileId}`;
      await axios.delete(deleteUrl);
      setFiles(files.filter((file) => file._id !== fileId));
      toast.success("File deleted successfully!");
    } catch (err) {
      console.error("Error deleting file:", err);
      if (err.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error("Failed to delete file. Please try again.");
      }
    }
  };

  const handleDownloadFile = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Error downloading file:", err);
      if (err.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error("Failed to download file. Please try again.");
      }
    }
  };

  const handleImageError = (fileId) => {
    console.log("Image failed to load for file:", fileId);
    setImageErrors((prev) => new Set(prev).add(fileId));
  };

  const handleVideoError = (fileId) => {
    console.log("Video failed to load for file:", fileId);
    setImageErrors((prev) => new Set(prev).add(fileId));
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "image":
        return <Image className="w-6 h-6 text-green-600" />;
      case "video":
        return <Video className="w-6 h-6 text-red-600" />;
      case "audio":
        return <Music className="w-6 h-6 text-purple-600" />;
      case "archive":
        return <Archive className="w-6 h-6 text-orange-600" />;
      default:
        return <FileText className="w-6 h-6 text-blue-600" />;
    }
  };

  const getFileTypeColor = (fileType) => {
    switch (fileType) {
      case "image":
        return "bg-green-100";
      case "video":
        return "bg-red-100";
      case "audio":
        return "bg-purple-100";
      case "archive":
        return "bg-orange-100";
      default:
        return "bg-blue-100";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isImageFile = (fileType) => {
    return fileType === "image";
  };

  const isVideoFile = (fileType) => {
    return fileType === "video";
  };

  const renderFilePreview = (file) => {
    const hasError = imageErrors.has(file._id);
    const displayUrl = isImageFile(file.fileType)
      ? getThumbnailUrl(file.fileUrl)
      : getImageKitUrl(file.fileUrl);

    if (isImageFile(file.fileType) && !hasError) {
      return (
        <img
          src={displayUrl}
          alt={file.fileName}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => handleImageError(file._id)}
          crossOrigin="anonymous"
        />
      );
    } else if (isVideoFile(file.fileType) && !hasError) {
      return (
        <video
          src={displayUrl}
          className="w-full h-full object-cover"
          controls
          preload="metadata"
          onError={() => handleVideoError(file._id)}
          crossOrigin="anonymous"
        />
      );
    } else {
      // Fallback for failed loads or other file types
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div
            className={`w-16 h-16 ${getFileTypeColor(
              file.fileType
            )} rounded-xl flex items-center justify-center`}
          >
            {getFileIcon(file.fileType)}
          </div>
        </div>
      );
    }
  };

  const isMobile = () => window.innerWidth < 768; // Tailwind's md breakpoint

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Files
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage and organize all your uploaded files in one place.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12">
            <div className="flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-3" />
              <span className="text-gray-600">Loading your files...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-12">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Delete confirmation modal */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white/80 via-indigo-100/70 to-purple-100/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-80 max-w-full border border-indigo-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              Confirm Delete
            </h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this file?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => setPendingDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow"
                onClick={async () => {
                  await handleDeleteFile(pendingDeleteId);
                  setPendingDeleteId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Files</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and organize all your uploaded files in one place.
          </p>
        </div>

        {/* Files Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">All Files</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {files.length} files
                </span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-6 bg-red-50 border-b border-red-200">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          )}

          {/* Files Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {files.map((file) => (
                <div
                  key={file._id}
                  className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* File Preview */}
                  <div
                    className="relative aspect-square bg-white"
                    onClick={() => {
                      if (isMobile()) {
                        setActiveMobileOverlay(file._id);
                      }
                    }}
                  >
                    {renderFilePreview(file)}
                    {/* Overlay with actions */}
                    <div
                      className={`
                        absolute inset-0 flex items-center justify-center
                        transition-all duration-300
                        ${
                          isMobile()
                            ? activeMobileOverlay === file._id
                              ? "bg-black bg-opacity-50 opacity-100"
                              : "opacity-0 pointer-events-none"
                            : "group-hover:bg-opacity-50 opacity-0 group-hover:opacity-100"
                        }
                      `}
                      onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
                    >
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleDownloadFile(file.fileUrl, file.fileName)
                          }
                          className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          title="Download file"
                        >
                          <Download className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          onClick={() => setPendingDeleteId(file._id)}
                          className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200"
                          title="Delete file"
                        >
                          <Trash2 className="w-5 h-5 text-white" />
                        </button>
                        {(isImageFile(file.fileType) ||
                          isVideoFile(file.fileType)) && (
                          <a
                            href={getImageKitUrl(file.fileUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                            title="View file"
                          >
                            <Eye className="w-5 h-5 text-white" />
                          </a>
                        )}
                        {isMobile() && activeMobileOverlay === file._id && (
                          <button
                            onClick={() => setActiveMobileOverlay(null)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full"
                            title="Close"
                          >
                            <svg
                              className="w-4 h-4 text-gray-700"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {file.fileName}
                      </h3>
                      {/* Show delete button for all file types on mobile */}
                      {isMobile() && (
                        <button
                          onClick={() => setPendingDeleteId(file._id)}
                          className="ml-2 p-1 bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200"
                          title="Delete file"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(file.uploadedAt)}</span>
                      </div>
                      <span className="capitalize">{file.fileType}</span>
                    </div>
                    {/* Debug info - remove in production */}
                    <div className="text-xs text-gray-400 mt-1 truncate">
                      {file.fileUrl}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {files.length === 0 && !error && (
            <div className="p-12 text-center">
              <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No files yet
              </h3>
              <p className="text-gray-500">
                Upload your first file to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Files;
