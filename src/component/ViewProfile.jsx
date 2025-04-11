import React from "react";

const ViewProfile = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 px-4">
      <div className="relative bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl w-full max-w-md shadow-2xl text-black dark:text-white animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md overflow-hidden">
            <img
              src={user.image}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {user.role} {user.batch ? `| ${user.batch}` : `| ID: ${user.facultyId}`}
          </p>

          {/* Skills */}
          {user.skills?.length > 0 && (
            <div className="mt-5 w-full">
              <h3 className="text-blue-600 dark:text-blue-400 font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full border border-blue-500"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* LinkedIn Button */}
          {user.linkedin && (
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition duration-200"
            >
              View LinkedIn
            </a>
          )}

          {/* Follow/Unfollow Button */}
          <button
            onClick={() => alert(user.isFollowing ? "Unfollowed" : "Followed")}
            className={`mt-4 px-6 py-2 rounded-full text-white font-medium transition duration-200 ${
              user.isFollowing
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {user.isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
