import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Upload", path: "/upload" },
    { name: "Files", path: "/files" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-lg fixed w-full z-50 transition-all duration-300"
      style={{ WebkitBackdropFilter: "blur(12px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-black text-indigo-600 tracking-tight drop-shadow-sm select-none"
          >
            Drop<span className="text-gray-900">Stack</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium transition group px-1 ${
                  isActive(item.path)
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-600 transition-all ${
                    isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/90 backdrop-blur-md px-6 pb-4 pt-2 shadow-xl transition-all duration-300 overflow-hidden ${
          isOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{ WebkitBackdropFilter: "blur(10px)" }}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={`block font-medium py-2 transition ${
              isActive(item.path)
                ? "text-indigo-600"
                : "text-gray-700 hover:text-indigo-600"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
