import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const API_KEY = "AIzaSyDJCD5gjFScPeqicX7zDSZeco8Mh1o7GfE";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCareerOptions, setShowCareerOptions] = useState(false);
  const [sessionContext, setSessionContext] = useState({});
  const messagesEndRef = useRef(null);

  const suggestions = [
    "How to connect with Aluminis on college connect",
    "Manage Account",
    "Career Suggestions and Roadmaps?",
    "Announcements",
    "Report Fake Accounts!",
    "Something else",
  ];

  const careerOptions = [
    "Full Stack Developer",
    "Front End Developer",
    "Backend Developer",
    "Data Scientist",
    "Blockchain Developer",
    "I'll search myself",
  ];

  const predefinedResponses = {
    "How to connect with Aluminis on college connect": `
      <strong>College connect is the great way to connect with aluminis.</strong><br/>
      I'll help you in connecting with them:<br/>
      1. Go to <strong>"Connect People"</strong> on navigation bar on top of the chatbot window<br/>
      2. Search using the <strong>"username"</strong>, <strong>"Person's name"</strong> or <strong>"College name"</strong><br/>
      3. Send them <strong>"Connection Request"</strong><br/>
      4. Hurray.. you're all set!
    `,
    "Manage Account": `
      <strong>To manage account:</strong> follow these simple steps:<br/>
      1. Go to <strong>"Profile"</strong> on Top right of Navigation Bar<br/>
      2. Manage the profile using the form given:<br/>
      &nbsp;&nbsp;&nbsp;- You can update <strong>Name</strong>, <strong>Profile Picture</strong> and so on..<br/>
      3. You're good to go!
    `,
    "Announcements": `
      <strong>Latest Announcements:</strong><br/>
      - New feature: Alumni Connect launched!<br/>
      - Upcoming webinar on Career Guidance (June 15)<br/>
      - Maintenance scheduled for June 20 (2:00 AM - 4:00 AM)
    `,
    "Report Fake Accounts!": `
      <strong>To report fake accounts:</strong><br/>
      1. Go to the profile you want to report<br/>
      2. Click on <strong>"More Options"</strong> (three dots)<br/>
      3. Select <strong>"Report Account"</strong><br/>
      4. Choose the reason and submit<br/>
      <em>Our team will review within 24 hours</em>
    `
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const formatBoldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const resetConversation = () => {
    setConversation([]);
    setShowCareerOptions(false);
    setSessionContext({});
  };

  const extractName = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("name is")) {
      const match = userMessage.match(/name is (\w+)/i);
      return match?.[1];
    }
    if (lowerMessage.includes("i am")) {
      const match = userMessage.match(/i am (\w+)/i);
      return match?.[1];
    }
    if (lowerMessage.includes("call me")) {
      const match = userMessage.match(/call me (\w+)/i);
      return match?.[1];
    }
    return null;
  };

  const handleSend = async (msg) => {
    let userMessage = msg || message.trim();
    if (!userMessage) return;

    setMessage("");

    // Insert logic to replace "Hey" with career counselor prompt
    const lowerMessage = userMessage.toLowerCase();
    const actualGeminiPrompt = lowerMessage === "hey" ? "Hey, act as a career counsellor" : userMessage;

    if (lowerMessage.includes("bye") || lowerMessage.includes("thanks") || lowerMessage.includes("thank you")) {
      const goodbyeMessage = sessionContext.name
        ? `Goodbye, ${sessionContext.name}! Have a great day!`
        : "Goodbye! Have a great day!";
      setConversation(prev => [...prev, { user: userMessage }, { bot: goodbyeMessage }]);
      setTimeout(resetConversation, 2000);
      return;
    }

    setConversation(prev => prev.filter(msg => msg.bot !== "Typing..."));
    const newConversation = [...conversation, { user: userMessage }];
    setConversation(newConversation);

    const possibleName = extractName(userMessage);
    if (possibleName) {
      setSessionContext(prev => ({ ...prev, name: possibleName }));
      const botResponse = `Okay, ${possibleName}. I've noted your name. How can I help you?`;
      setConversation([...newConversation, { bot: formatBoldText(botResponse) }]);
      return;
    }

    if (lowerMessage.includes("what is my name")) {
      const botResponse = sessionContext.name
        ? `Your name is ${sessionContext.name}.`
        : "I don't know your name yet. What should I call you?";
      setConversation([...newConversation, { bot: formatBoldText(botResponse) }]);
      return;
    }

    let botResponse = "";

    if (userMessage === "Career Suggestions and Roadmaps?") {
      setShowCareerOptions(true);
      botResponse = "Please select the Career you're aiming for:";
    } else if (careerOptions.includes(userMessage)) {
      setShowCareerOptions(false);
      switch (userMessage) {
        case "Full Stack Developer":
          botResponse = "🖥️ <strong>Full Stack Developer Roadmap:</strong><br/>" +
                        "🔹 <strong>Tech Stack:</strong> MERN, MEAN.<br/>" +
                        "📚 <strong>Courses:</strong> Love Babbar MERN, Colt Steele Bootcamp.";
          break;
        case "Front End Developer":
          botResponse = "🎨 <strong>Front End Roadmap:</strong><br/>" +
                        "🔹 <strong>Stack:</strong> HTML, CSS, JS, React.<br/>" +
                        "📚 <strong>Courses:</strong> Chai aur Code React, Jonas CSS.";
          break;
        case "Backend Developer":
          botResponse = "💾 <strong>Backend Roadmap:</strong><br/>" +
                        "🔹 <strong>Stack:</strong> Node.js, Django, Spring Boot.<br/>" +
                        "📚 <strong>Courses:</strong> Hitesh Choudhary Backend.";
          break;
        case "Data Scientist":
          botResponse = "📊 <strong>Data Scientist Roadmap:</strong><br/>" +
                        "🔹 <strong>Tools:</strong> Pandas, TensorFlow, PyTorch.<br/>" +
                        "📚 <strong>Courses:</strong> Krish Naik, Andrew Ng.";
          break;
        case "Blockchain Developer":
          botResponse = "🔗 <strong>Blockchain Roadmap:</strong><br/>" +
                        "🔹 <strong>Stack:</strong> Solidity, Web3.js.<br/>" +
                        "📚 <strong>Courses:</strong> Patrick Collins Ethereum.";
          break;
        case "I'll search myself":
          botResponse = "Okay, what are you looking for?";
          break;
        default:
          botResponse = "I can help with that!";
          break;
      }
    } else if (predefinedResponses[userMessage]) {
      botResponse = predefinedResponses[userMessage];
    } else {
      setLoading(true);
      try {
        const contextPrompt = sessionContext.name ? `The user's name is ${sessionContext.name}. ` : "";
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
          {
            contents: [{ role: "user", parts: [{ text: `${contextPrompt}${actualGeminiPrompt}` }] }],
          },
          { headers: { "Content-Type": "application/json" } }
        );
        botResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
      } catch (error) {
        console.error("API error:", error);
        botResponse = "⚠️ Error fetching response.";
      } finally {
        setLoading(false);
      }
    }

    setConversation([...newConversation, { bot: formatBoldText(botResponse) }]);
  };

// Here the jsx layout 

return (
  <div className="min-h-screen bg-indigo-50 dark:bg-gray-900 flex flex-col transition-colors duration-500">
    <Navbar />
    <div className="flex items-center justify-center flex-grow p-4">
      <div className="w-full max-w-md h-[600px] bg-white dark:bg-gray-800 text-black dark:text-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-indigo-200 dark:border-gray-700 transition-colors duration-500">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-4 text-lg font-bold text-center rounded-t-2xl">
          🤖 Indigo AI Career Chatbot
        </div>

        {conversation.length === 0 && (
          <div className="p-4 bg-indigo-100 dark:bg-gray-700 border-b border-indigo-300 dark:border-gray-600">
            <p className="text-indigo-800 dark:text-white mb-2 text-sm">What can I help you with?</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="bg-indigo-200 hover:bg-indigo-600 text-indigo-800 hover:text-white dark:bg-indigo-700 dark:text-white px-3 py-2 rounded-xl text-sm transition duration-300"
                  onClick={() => handleSend(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 px-4 py-2 overflow-y-auto scroll-smooth">
          {conversation.map((msg, index) => (
            <div key={index} className="mb-4">
              {msg.user && <p className="text-indigo-700 dark:text-indigo-300 font-semibold">You: {msg.user}</p>}
              {msg.bot && (
                <p
                  className="text-gray-800 dark:text-gray-100 whitespace-pre-line mt-1"
                  dangerouslySetInnerHTML={{ __html: msg.bot }}
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
          {showCareerOptions && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {careerOptions.map((career, idx) => (
                <button
                  key={idx}
                  className="bg-indigo-100 hover:bg-indigo-600 text-indigo-800 hover:text-white dark:bg-indigo-700 dark:text-white px-3 py-2 rounded-xl text-sm transition"
                  onClick={() => handleSend(career)}
                >
                  {career}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-indigo-200 dark:border-gray-600 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={() => handleSend()}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>

        <div className="p-2 border-t border-indigo-100 dark:border-gray-700 text-center bg-indigo-50 dark:bg-gray-800">
          <button
            onClick={resetConversation}
            className="text-indigo-600 dark:text-indigo-300 hover:underline text-sm"
          >
            Reset Conversation
          </button>
        </div>
      </div>
    </div>
  </div>
);

  
};

export default Chatbot;
