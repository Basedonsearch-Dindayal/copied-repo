"use client"

import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import ViewProfile from "./ViewProfile"

const dummyUsers = [
  {
    _id: "1",
    name: "John Doe",
    role: "Student",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    skills: ["JavaScript", "React", "Node.js"],
  },
  {
    _id: "2",
    name: "Jane Smith",
    role: "Faculty",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    school: "VIT Bhopal",
  },
  {
    _id: "3",
    name: "Alice Johnson",
    role: "Alumni",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    company: "Google",
  },
  {
    _id: "4",
    name: "Bob Brown",
    role: "Student",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    skills: ["HTML", "CSS", "JavaScript"],
  },
]

const ConnectPeople = () => {
  const [users, setUsers] = useState(dummyUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [connectionRequests, setConnectionRequests] = useState([dummyUsers[0], dummyUsers[2]])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([])
    } else {
      setSearchResults(users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }
  }, [searchTerm, users])

  const handleAcceptRequest = (userId) => {
    setConnectionRequests((prev) => prev.filter((user) => user._id !== userId))
  }

  const handleIgnoreRequest = (userId) => {
    setConnectionRequests((prev) => prev.filter((user) => user._id !== userId))
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white transition-all duration-300">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 dark:text-indigo-300">Connect with People</h2>

        <input
          type="text"
          placeholder="Search users..."
          className="w-full mb-6 p-3 border border-indigo-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {connectionRequests.length > 0 && (
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Connection Requests</h3>
            {connectionRequests.map((user) => (
              <div key={user._id} className="flex items-center mb-4 gap-4">
                <img
                  src={user.image || "/placeholder.svg"}
                  alt={user.name}
                  className="w-14 h-14 rounded-full border-2 border-indigo-500"
                />
                <div>
                  <h4 className="font-bold">{user.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => handleAcceptRequest(user._id)}
                    className="px-4 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleIgnoreRequest(user._id)}
                    className="px-4 py-1 rounded-md bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Ignore
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-4">Search Results</h3>
            {searchResults.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-4 p-4 rounded-md hover:bg-indigo-100 dark:hover:bg-zinc-700 cursor-pointer transition"
              >
                <img
                  src={user.image || "/placeholder.svg"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-indigo-500"
                />
                <div>
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <h3 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">People You May Know</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center"
            >
              <img
                src={user.image || "/placeholder.svg"}
                alt={user.name}
                className="w-24 h-24 rounded-full border-2 border-indigo-400 mb-4"
              />
              <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">{user.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
              {user.role === "Student" && (
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Skills: {user.skills?.join(", ")}</p>
              )}
              {user.role === "Faculty" && <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">School: {user.school}</p>}
              {user.role === "Alumni" && <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Company: {user.company}</p>}
              <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md">
                Follow
              </button>
            </div>
          ))}
        </div>
        {selectedUser && <ViewProfile user={selectedUser} onClose={() => setSelectedUser(null)} />}
      </div>
    </div>
  )
}

export default ConnectPeople
