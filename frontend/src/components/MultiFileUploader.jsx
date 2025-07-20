import React, { useState } from "react";
import { Upload, File, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { apiService } from "../services/apiService";

const MultiFileUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleChange = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length > 20) {
      setMessage("You can only upload up to 20 files.");
      setMessageType("error");
    } else {
      setFiles(selected);
      setMessage("");
      setMessageType("");
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setUploading(true);
      const response = await apiService.uploadFiles(formData);
      setMessage("Files uploaded successfully!");
      setMessageType("success");
      setFiles([]);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Try again.");
      setMessageType("error");
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Your Files
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Drag and drop your files or click to browse. Support for multiple
            file types up to 20 files at once.
          </p>
        </div>

        {/* Upload Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Upload Area */}
          <div className="p-8 border-b border-gray-100">
            <div className="relative">
              <input
                type="file"
                multiple
                accept="*/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 hover:border-indigo-400 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300 mb-4" />
                  <p className="mb-2 text-lg font-semibold text-gray-700">
                    <span className="text-indigo-600">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    Any file type, up to 20 files
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <File className="w-5 h-5 mr-2 text-indigo-600" />
                Selected Files ({files.length})
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <File className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className="p-6 bg-white">
            <button
              onClick={handleUpload}
              disabled={uploading || files.length === 0}
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>
                    Upload {files.length} File{files.length !== 1 ? "s" : ""}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-xl border ${
              messageType === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center">
              {messageType === "success" ? (
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              )}
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiFileUploader;
