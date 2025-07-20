import React from "react";
import {
  Upload,
  Shield,
  Zap,
  Cloud,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  FileText,
  Globe,
  Lock,
} from "lucide-react";
import MultiFileUploader from "./MultiFileUploader";

const Home = () => {
  const features = [
    {
      icon: <Cloud className="w-8 h-8 text-indigo-600" />,
      title: "Cloud Storage",
      description: "Access your files from anywhere with secure cloud storage.",
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: "Secure & Private",
      description:
        "Enterprise-grade encryption keeps your files safe and private.",
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: "Lightning Fast",
      description: "Upload and download files with blazing fast speeds.",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Easy Sharing",
      description:
        "Share files with anyone using secure links and permissions.",
    },
  ];

  const stats = [
    { number: "10M+", label: "Files Uploaded" },
    { number: "99.9%", label: "Uptime" },
    { number: "50K+", label: "Happy Users" },
    { number: "24/7", label: "Support" },
  ];

  const benefits = [
    "No file size limits",
    "Instant file sharing",
    "Advanced security",
    "Cross-platform access",
    "Real-time collaboration",
    "Automatic backups",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 50,000+ users worldwide
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Store, Share & Manage
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {" "}
                Your Files
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              DropStack provides secure, fast, and reliable file storage. Upload
              unlimited files, share with anyone, and access from anywhere in
              the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose DropStack?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technology to provide the best file management
              experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-indigo-100 rounded-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Uploading Today
            </h2>
            <p className="text-xl text-gray-600">
              Drag and drop your files or click to browse. It's that simple!
            </p>
          </div>
          <MultiFileUploader />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Everything you need for file management
              </h2>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                DropStack combines powerful features with simplicity to give you
                the ultimate file management experience. No more worrying about
                storage limits or security.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-white">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Unlimited Storage
                    </h3>
                    <p className="text-indigo-100 text-sm">
                      Store as many files as you need
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Global Access</h3>
                    <p className="text-indigo-100 text-sm">
                      Access your files from anywhere
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Bank-Level Security
                    </h3>
                    <p className="text-indigo-100 text-sm">
                      Your files are encrypted and secure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who trust DropStack for their file
            management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Uploading Now
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
