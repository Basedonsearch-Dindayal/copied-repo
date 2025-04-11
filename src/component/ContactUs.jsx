import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ContactUs = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      setSubmitted(true);
      setFeedback('');
    } else {
      alert('Please enter your feedback before submitting.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1400&q=80")',
      }}
    >
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="max-w-lg mx-auto mt-24 mb-16 px-6 py-10 bg-black/70 backdrop-blur-md rounded-2xl shadow-2xl text-center text-white">
        {!submitted ? (
          <>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              Share Your Thoughts ✨
            </h2>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
              rows={6}
              className="w-full text-sm p-4 rounded-xl border-2 border-cyan-400 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none transition"
            />

            <button
              onClick={handleFeedbackSubmit}
              className="w-full mt-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-cyan-500 hover:to-teal-400 transition duration-300 shadow-md"
            >
              ✉️ Submit Feedback
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-5 animate-fade-in">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              Thank You!
            </h2>
            <p className="text-white text-base opacity-90">
              Your feedback means a lot to us!
            </p>
            <img
              src="/form.png"
              alt="Thank You Illustration"
              className="w-24 h-24 rounded-full shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
