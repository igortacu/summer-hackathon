// src/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import logoSrc from '../../data/logo_virtlab-removebg-preview.png';

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground">
      {/* Top section: logo / links / socials */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center mb-6 md:mb-0">
          <img src={logoSrc} alt="VirtLab Logo" className="h-24 w-auto" />
        </Link>

        {/* Core Links */}
        <ul className="flex flex-wrap justify-center space-x-6 mb-6 md:mb-0">
          <li>
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/experiments" className="hover:text-primary transition-colors">
              Experiments
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <circle cx="17.5" cy="6.5" r="1"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-4 text-center text-xs">
        © {new Date().getFullYear()} VirtLab. All rights reserved.
      </div>
    </footer>
  );
}
