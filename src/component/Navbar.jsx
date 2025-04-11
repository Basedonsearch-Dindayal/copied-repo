"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useUser } from "../contexts/UserContext"
import {
  Home,
  Users,
  Info,
  User,
  Mail,
  HelpCircle,
  LogOut,
  Sun,
  Moon,
} from "lucide-react"

const Navbar = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUser()

  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark")

  useEffect(() => {
    const root = window.document.documentElement
    if (darkMode) {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const response = await axios.get("http://localhost:5005/api/user", {
          headers: { Authorization: token },
        })
        setUser(response.data)
      } catch (error) {
        console.error("Error fetching user", error)
      }
    }

    fetchUser()
  }, [setUser])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/login")
  }

  const handleNavigate = (path) => {
    navigate(path)
  }

  const navItems = [
    { label: "Home", icon: <Home size={25} />, path: "/home" },
    { label: "Network", icon: <Users size={25} />, path: "/connect" },
    { label: "About Us", icon: <Info size={25} />, path: "/about" },
    { label: "Profile", icon: <User size={25} />, path: "/profile" },
    { label: "Contact", icon: <Mail size={25} />, path: "/contact" },
    { label: "Help", icon: <HelpCircle size={25} />, path: "/chatbot" },
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 shadow border-b border-gray-200 dark:border-gray-800 py-2 px-4 sticky top-0 z-50">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left: Logo or Greeting */}
        <div className="flex items-center gap-3 min-w-fit">
          <span className="text-xl font-bold text-blue-600 dark:text-white">CollegeConnect</span>
          {user && (
            <span className="hidden md:inline-flex font-medium text-gray-700 dark:text-white">
              👋 Hi, {user.name}
            </span>
          )}
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-4 w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right: Nav Icons + Theme + Logout */}
        <div className="flex items-center gap-8 flex-wrap justify-end text-gray-700 dark:text-white">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className="flex flex-col items-center text-xs hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              {item.icon}
              <span className="hidden md:block">{item.label}</span>
            </button>
          ))}

          <button onClick={() => setDarkMode(!darkMode)} className="hover:text-yellow-400">
            {darkMode ? <Sun size={20} /> : <Moon size={27} />}
          </button>

          {user && (
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
            >
              <LogOut size={25} />
              <span className="hidden md:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
