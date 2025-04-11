import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const [profilePic, setProfilePic] = useState(null);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    username: "",
    email: "",
    branch: "",
    hobbies: "",
    skills: "",
    year: "",
    description: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:5005/api/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfileDetails(data);
        if (data.profilePic) setProfilePic(data.profilePic);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        toast.success("Profile photo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(profileDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const response = await fetch("http://localhost:8000/api/profile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save profile");
      toast.success("Profile saved successfully!");
    } catch (error) {
      toast.error("Error saving profile. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 shadow-2xl rounded-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Your Profile</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left - Profile Pic Upload */}
          <div className="flex flex-col items-center lg:w-1/3">
            <label htmlFor="profile-pic-upload" className="cursor-pointer">
              <div className="w-44 h-44 rounded-full overflow-hidden shadow-lg border-4 border-pink-400 hover:scale-105 transition">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                    Upload Profile Pic
                  </div>
                )}
              </div>
            </label>
            <input
              id="profile-pic-upload"
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
            <p className="text-sm mt-3 text-gray-500 dark:text-gray-300">Click to upload/change photo</p>
          </div>

          {/* Right - Form Inputs */}
          <form onSubmit={handleSubmit} className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.keys(profileDetails).map((key, idx) => (
              <div key={idx} className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-200 font-medium mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  name={key}
                  value={profileDetails[key]}
                  onChange={handleInputChange}
                  className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
            ))}

            <div className="col-span-full">
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl transition-all shadow-lg"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
