import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaLinkedin, FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";

const AboutUs = () => {
  const features = [
    {
      title: "Share Your Thoughts",
      color: "pink",
      text: "Post your ideas and engage with others in meaningful discussions.",
    },
    {
      title: "Event Updates",
      color: "purple",
      text: "Stay informed about the latest college events and activities.",
    },
    {
      title: "Real-Time Notifications",
      color: "pink",
      text: "Receive alerts about new opportunities and announcements.",
    },
    {
      title: "Direct Messaging",
      color: "purple",
      text: "Chat with alumni, faculty, and students instantly.",
    },
    {
      title: "Resource Sharing",
      color: "pink",
      text: "Upload and access notes, projects, and study materials easily.",
    },
    {
      title: "Community Building",
      color: "purple",
      text: "Build a strong network with peers and mentors.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white font-sans">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.mpnvva.in/Image/UniversityPicture?instituteID=35')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Welcome to VIT Bhopal Alumni Connect
          </h1>
          <p className="text-lg md:text-xl font-medium">
            Bridging students, faculty, and alumni under one vibrant platform
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="max-w-4xl mx-auto bg-purple-50 text-gray-900 rounded-xl shadow-lg p-8 mt-10 px-6 md:px-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">About Us</h2>
        <p className="text-lg leading-relaxed text-gray-800">
          VIT Bhopal Alumni Connect is a platform designed to bring together
          students, faculty, and alumni to foster meaningful interactions. We aim to create a collaborative space
          where knowledge sharing, networking, and mentorship thrive.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mt-14 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-${feature.color}-100 border border-${feature.color}-300 rounded-lg p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
          >
            <h3 className={`text-xl font-semibold text-${feature.color}-600 mb-2`}>
              {feature.title}
            </h3>
            <p className="text-sm text-gray-700">{feature.text}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-purple-700 py-8 mt-16 text-white">
        <h3 className="text-center text-xl font-semibold mb-4">Follow Us</h3>
        <div className="flex justify-center gap-8 text-2xl">
          <a
            href="https://www.linkedin.com/school/vellore-institute-of-technology/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300 transition-transform transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.facebook.com/Vellore.Institute.of.Technology/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300 transition-transform transform hover:scale-110"
          >
            <FaFacebook />
          </a>
          <a
            href="https://x.com/VIT_univ"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300 transition-transform transform hover:scale-110"
          >
            <FaTwitter />
          </a>
          <a
            href="https://github.com/ojaswi2c9t/CollegeConnect"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300 transition-transform transform hover:scale-110"
          >
            <FaGithub/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
