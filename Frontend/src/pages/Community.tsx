// src/pages/Community.tsx
import React from 'react'
import Layout from '@/components/layout/Layout'
import heroVideo from '../data/cody_pointing_right.mp4'
import SplitText from '@/components/animations/SplitText'
import {
  MessageSquare,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight
} from 'lucide-react'
import { useTranslation } from 'react-i18next';


const SOCIALS = [
  {
    name: 'Telegram',
    icon: <MessageSquare />,
    description: 'Join our main chat · 15K+ members',
    href: 'https://t.me/yourchannel',
    gradient: 'from-[#0088cc] to-[#00aaff]'
  },
  {
    name: 'Instagram',
    icon: <Instagram />,
    description: 'Daily updates & behind scenes · 8K+ followers',
    href: 'https://instagram.com/yourpage',
    gradient: 'from-pink-500 to-yellow-500'
  },
  {
    name: 'X (Twitter)',
    icon: <Twitter />,
    description: 'Latest news & announcements · 12K+ followers',
    href: 'https://twitter.com/yourhandle',
    gradient: 'from-gray-800 to-black'
  },
  {
    name: 'Facebook',
    icon: <Facebook />,
    description: 'Community events & discussions · 6K+ members',
    href: 'https://facebook.com/yourpage',
    gradient: 'from-blue-600 to-blue-400'
  }
]

export default function Community() {
  const { t } = useTranslation();
  return (
    <Layout>
      <section className="bg-[#fffffd] py-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6">

          {/* 1. Big Cody video */}
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-2xl flex-shrink-0 transform translate-x-12"
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
          />

          {/* 2. Headline + socials */}
          <div className="flex-1 max-w-md ml-auto space-y-6">
            {/* Split headline as two animated lines */}
            <div className="space-y-2">
              <SplitText
                text="Join the VirtLab"
                className="text-3xl lg:text-4xl font-extrabold text-gray-800"
                delay={50}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-100px"
                textAlign="left"
              />
              <SplitText
                text="Community"
                className="text-3xl lg:text-4xl font-extrabold text-gray-800"
                delay={150}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-100px"
                textAlign="left"
              />
            </div>

            <p className="text-gray-600">
              Connect with fellow learners, get tips from Cody, and stay up-to-date on all things VirtLab!
            </p>

            <div className="space-y-4">
              {SOCIALS.map(({ name, icon, description, href, gradient }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className={`
                    flex items-center px-4 py-3 rounded-xl shadow-lg
                    bg-gradient-to-r ${gradient}
                    text-white group hover:scale-105 transition-transform
                    max-w-[320px]
                  `}
                >
                  <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30">
                    {React.cloneElement(icon, { className: 'w-6 h-6' })}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-sm opacity-90">{description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto opacity-80 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
