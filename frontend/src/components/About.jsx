import React from "react";
import { Shield, Zap, Cloud, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Cloud className="w-8 h-8 text-indigo-600" />,
      title: "Cloud Storage",
      description:
        "Secure cloud-based file storage with instant access from anywhere.",
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: "Secure & Private",
      description:
        "Your files are encrypted and protected with enterprise-grade security.",
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: "Lightning Fast",
      description:
        "Upload and download files with blazing fast speeds and no limits.",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Easy Sharing",
      description:
        "Share files with anyone using secure links and permissions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About DropStack
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A modern, secure, and lightning-fast file storage solution designed
            for the digital age.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              DropStack is built with the vision of providing a seamless,
              secure, and efficient file management experience. We believe that
              file storage should be simple, fast, and accessible to everyone,
              while maintaining the highest standards of security and privacy.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-indigo-100 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10M+</div>
              <div className="text-indigo-100">Files Uploaded</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-indigo-100">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-indigo-100">Happy Users</div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Have questions or suggestions? We'd love to hear from you.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
