import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCog } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null); // This will later be connected to your authentication system

  return (
    <div className="container mx-auto px-4 py-8">
      {!user ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-gray-900 rounded-lg p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <FaUser className="text-5xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome to Streamr</h2>
            <p className="text-gray-400">Please sign in to access your profile</p>
          </div>

          <div className="space-y-4">
            <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Sign In
            </button>
            <button className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Create Account
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gray-900 rounded-lg p-8 shadow-lg">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                <FaUser className="text-3xl text-gray-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaCog className="text-gray-400" />
                  Account Settings
                </h3>
                <div className="space-y-4">
                  <button className="w-full py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    <FaEnvelope />
                    Update Email
                  </button>
                  <button className="w-full py-2 px-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    Change Password
                  </button>
                  <button className="w-full py-2 px-4 bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;