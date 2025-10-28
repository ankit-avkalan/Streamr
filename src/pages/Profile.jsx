import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaUser, FaEnvelope, FaCog, FaSignOutAlt, FaLock } from 'react-icons/fa'

/**
 * Professional, minimalistic Profile component with a true pitch-black background.
 * - Accessible: keyboard focus, aria labels
 * - Responsive: compact on mobile, expanded on desktop
 * - Conservative motion respecting user preferences
 * - Props/hooks placeholders so you can wire auth later
 */

const Profile = ({ initialUser = null, onSignIn, onCreateAccount, onSignOut }) => {
  const [user] = useState(initialUser)
  const reduce = useReducedMotion()

  const containerMotion = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.32 }
  }

  const btnBase = 'w-full py-2.5 rounded-lg font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2'

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      {!user ? (
        <motion.section
          {...(reduce ? {} : containerMotion)}
          className="w-full max-w-sm bg-black border border-neutral-800/60 rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.6)] p-6"
          aria-labelledby="profile-heading"
        >
          <header className="text-center mb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center">
              <FaUser className="text-2xl text-neutral-400" aria-hidden />
            </div>
            <h1 id="profile-heading" className="mt-3 text-lg font-semibold">Welcome to Streamr</h1>
            <p className="mt-1 text-sm text-neutral-400">Sign in to personalize your dashboard</p>
          </header>

          <div className="space-y-3">
            <button
              onClick={onSignIn}
              className={`${btnBase} bg-white text-black hover:shadow-lg`}
              aria-label="Sign in"
            >
              Sign in
            </button>

            <button
              onClick={onCreateAccount}
              className={`${btnBase} bg-neutral-900 border border-neutral-800 text-neutral-200 hover:bg-neutral-800`}
              aria-label="Create account"
            >
              Create account
            </button>
          </div>
        </motion.section>
      ) : (
        <motion.section
          {...(reduce ? {} : containerMotion)}
          className="w-full max-w-2xl bg-black border border-neutral-800/60 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.65)] p-6"
          aria-labelledby="account-heading"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center">
                <FaUser className="text-2xl text-neutral-400" aria-hidden />
              </div>
              <div>
                <h2 id="account-heading" className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-neutral-400">{user.email}</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onSignOut}
                className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Sign out"
              >
                <span className="hidden sm:inline">Sign out</span>
                <span className="sm:hidden"><FaSignOutAlt /></span>
              </button>
            </div>
          </div>

          <hr className="my-6 border-neutral-800/50" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-600"
              aria-label="Update email"
            >
              <FaEnvelope className="text-neutral-400" />
              <span className="text-sm">Update email</span>
            </button>

            <button
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-600"
              aria-label="Change password"
            >
              <FaLock className="text-neutral-400" />
              <span className="text-sm">Change password</span>
            </button>

            <button
              onClick={onSignOut}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white sm:col-span-2"
              aria-label="Sign out"
            >
              <FaSignOutAlt className="text-white" />
              <span className="text-sm">Sign out</span>
            </button>
          </div>
        </motion.section>
      )}
    </div>
  )
}

export default Profile
