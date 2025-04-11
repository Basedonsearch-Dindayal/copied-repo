import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [batch, setBatch] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [department, setDepartment] = useState('');
  const [company, setCompany] = useState('');
  const [passedOutBatch, setPassedOutBatch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setBatch('');
    setRegNumber('');
    setFacultyId('');
    setDepartment('');
    setCompany('');
    setPassedOutBatch('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userDetails = {
      name: username,
      email,
      password,
      role,
      batch: role === "student" ? batch : "",
      regNumber: role === "student" ? regNumber : "",
      facultyId: role === "faculty" ? facultyId : "",
      department: role === "faculty" ? department : "",
      company: role === "alumni" ? company : "",
      passedOutBatch: role === "alumni" ? passedOutBatch : "",
    };

    try {
      const response = await fetch('http://localhost:5005/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        alert('✅ Signup Successful! Please log in.');
        navigate('/login');
      } else {
        alert(`❌ Signup Failed: ${data.message}`);
      }
    } catch (error) {
      setLoading(false);
      console.error('Signup Error:', error);
      alert('❌ An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen font-inter">
  {/* Left Form Section */}
  <div className="flex-1 flex flex-col justify-center px-8 md:px-24\\ bg-white">
    <div className="max-w-lg w-full mx-auto">
      {/* Website Title */}
      <h1 className="text-5xl font-extrabold text-blue-600 mb-6">College Connect</h1>
      <h2 className="text-4xl font-bold mb-3 text-gray-800 leading-tight">
        Start Your Success Story
      </h2>
      <p className="text-gray-500 mb-8">
        Uncover a world of literary adventure. Sign up and start exploring.
      </p>

      <form onSubmit={handleSignup} className="space-y-5">
        {/* Full Name */}
        <input
          required
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email */}
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          required
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role Selector */}
        <select
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="alumni">Alumni</option>
        </select>

        {/* Conditional Fields */}
        {role === 'student' && (
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Batch"
              value={batch}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setBatch(e.target.value)}
            />
            <input
              type="text"
              placeholder="Reg. No."
              value={regNumber}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setRegNumber(e.target.value)}
            />
          </div>
        )}

        {role === 'faculty' && (
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Faculty ID"
              value={facultyId}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFacultyId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Department"
              value={department}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
        )}

        {role === 'alumni' && (
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Company"
              value={company}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCompany(e.target.value)}
            />
            <input
              type="text"
              placeholder="Passed Out Batch"
              value={passedOutBatch}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassedOutBatch(e.target.value)}
            />
          </div>
        )}

        {/* Terms & Conditions */}
        <label className="flex items-center space-x-2 text-sm text-gray-600">
          <input
            type="checkbox"
            required
            className="form-checkbox rounded text-blue-600"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms & Conditions
            </a>
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-300"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  </div>

  {/* Right Image Section */}
  <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 p-10">
    <img
      src="https://thumbs.dreamstime.com/b/sign-page-abstract-concept-vector-illustration-enter-application-mobile-screen-user-login-form-website-interface-ui-new-profile-266156148.jpg"
      alt="Signup Illustration"
      className="max-w-md w-full object-contain"
    />
  </div>
</div>

  );
};

export default Signup;
