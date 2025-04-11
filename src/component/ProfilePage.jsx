import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [form, setForm] = useState({
    firstName: "Maria",
    lastName: "Boone",
    email: "maria@site.com",
    currentPassword: "",
    newPassword: "",
    phone: "",
    phoneType: "Mobile",
    gender: "Female",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        toast.success("Profile photo uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
    console.log("Form Data:", form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden">
          {/* Left: Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {/* Profile Upload */}
              <div className="flex items-center gap-4">
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border dark:border-gray-600 shadow">
                    {profilePic ? (
                      <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 dark:text-gray-300 text-xl">+</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id="photo-upload"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </label>
                <span className="text-gray-500 dark:text-gray-300">Upload Profile Photo</span>
              </div>

              {/* Names */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              {/* Password */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  placeholder="Current Password"
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              {/* Phone */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <select
                  name="phoneType"
                  value={form.phoneType}
                  onChange={handleChange}
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="Mobile">Mobile</option>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                </select>
              </div>

              {/* Gender */}
              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={handleChange}
                      className="accent-pink-500"
                    />
                    {g}
                  </label>
                ))}
              </div>

              {/* Bio */}
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Your bio..."
                rows="3"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-lg transition-all duration-300"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Right: Illustration */}
          <div className="hidden md:flex items-center justify-center bg-pink-50 dark:bg-gray-800 p-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5818/5818321.png"
              alt="Profile Illustration"
              className="w-80 h-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
