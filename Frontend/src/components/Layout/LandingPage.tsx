// src/components/Layout/LandingPage.tsx
import React from 'react';
import { Users, Zap, BarChart2, ShieldCheck, Globe } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import logo from '../../assets/logo.png';
import animCow from '../../assets/anim_cow.mp4';

export interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const blobVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 0.2, scale: 1.2, transition: { duration: 3, yoyo: Infinity, ease: 'easeInOut' } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.3, duration: 0.6, ease: 'easeOut' } }),
};

export default function LandingPage({ onLogin, onSignup }: LandingPageProps) {
  return (
    <div className="relative overflow-hidden text-[#6F4518]">
      {/* Animated Background Blobs */}

      {/* NAVBAR */}
      <motion.nav
        className="fixed w-full bg-white backdrop-blur-md shadow z-20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <img src={logo} alt="Bublink" className="h-12 md:h-20 w-auto cursor-pointer" />
          <div className="space-x-6">
            <motion.button whileHover={{ scale: 1.1 }} className="font-medium" onClick={onLogin}>
              Log In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-[#6F4518] text-white px-5 py-2 rounded-full font-semibold shadow"
              onClick={onSignup}
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <header className="min-h-screen flex items-center justify-center pt-24">
        <div className="container mx-auto px-6 lg:flex lg:items-center lg:justify-between">
          <motion.div
            className="lg:w-1/2 space-y-6"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <motion.h1
              className="text-5xl lg:text-6xl font-bold text-[#583101] leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Build. Learn. Link. Welcome to Bublink
            </motion.h1>
            <motion.p
              className="text-lg lg:text-xl text-[#8B5E34] max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Collaborate with AI-driven allocation, live analytics, and micro-animations for real-time feedback.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={onSignup}
                className="bg-[#6F4518] text-white px-6 py-3 rounded-full font-semibold shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Start Free
              </motion.button>
              <motion.button
                onClick={onLogin}
                className="border-2 border-[#6F4518] text-[#6F4518] px-6 py-3 rounded-full font-semibold"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(196,133,57,0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Read More
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 mt-10 lg:mt-0 relative"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Hero video */}
            <video
              src={animCow}
              autoPlay
              loop
              muted
              playsInline
              className="w-full bg-transparent"
              disablePictureInPicture
              disableRemotePlayback
            />
            {/* Floating Icon */}
            <motion.div
              className="absolute top-5 left-5"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ...restul paginii rămâne neschimbat... */}
    </div>
  );
}

