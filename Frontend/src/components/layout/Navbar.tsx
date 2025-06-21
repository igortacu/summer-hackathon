// src/components/layout/Navbar.tsx
import 'flag-icons/css/flag-icons.min.css';
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserPlus, Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoSrc from '../../data/logo_virtlab-removebg-preview.png';

const NAV_LINKS = [
  { name: 'Home', to: '/', id: 'home' },
  { name: 'Experiments', to: '/experiments', id: 'experiments' },
  { name: 'About', to: '/about', id: 'about' },
  { name: 'Community', to: '/community', id: 'community' },
] as const;

const LANGS = [
  { locale: 'en', code: 'us' },
  { locale: 'ro', code: 'ro' },
  { locale: 'ru', code: 'ru' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();

  // handle scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLanguage = (loc: typeof LANGS[number]['locale']) => {
    i18n.changeLanguage(loc);
    setLangOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-colors duration-500',
        scrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto grid grid-cols-3 items-center px-6 py-4">
        {/* 1) Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={logoSrc}
              alt="VirtLab"
              className="h-16 w-auto transform scale-150 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* 2) Centered nav links */}
        <ul className="hidden md:flex justify-center space-x-8">
          {NAV_LINKS.map((link) => (
            <li key={link.id} className="relative group">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'font-medium text-gray-700 transition-colors duration-300',
                    isActive ? 'text-blue-600' : 'hover:text-blue-600'
                  )
                }
              >
                {link.name}
                <span
                  className={cn(
                    'absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all duration-300',
                    'group-hover:w-full',
                    'w-0'
                  )}
                />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 3) Actions: language, dashboard, signup, mobile toggle */}
        <div className="flex justify-end items-center space-x-4">
          {/* language picker, dashboard & signup, mobile menu */}
          

          <Link to="/dashboard" className="hidden md:block">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>

          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-500 text-white">
            <UserPlus className="w-4 h-4 mr-1" />
            Sign Up
          </Button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          'md:hidden fixed inset-0 bg-white bg-opacity-95 backdrop-blur-lg transform transition-transform',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <img src={logoSrc} alt="VirtLab" className="h-10" />
          </Link>
          <button onClick={() => setMobileOpen(false)} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <ul className="px-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block text-lg font-medium text-gray-700 hover:text-blue-600"
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="px-6 mt-6 space-y-4">
          <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
            <Button variant="outline" size="sm" className="w-full">
              Dashboard
            </Button>
          </Link>
          <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-blue-500 text-white">
            <UserPlus className="w-4 h-4 mr-1" />
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
