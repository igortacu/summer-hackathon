  import React from 'react';
  import Navbar from './Navbar';
  import Footer from './Footer';
  import { Badge } from "@/components/ui/badge";
  import { Award } from "lucide-react";
  import { useLocation, useNavigate } from 'react-router-dom';
  import Chatbot from '../ui/Chatbot';  

  interface LayoutProps {
    children: React.ReactNode;
  }

  const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isDashboard = location.pathname === '/dashboard';

    // Check if user is logged in (you can implement proper auth logic here)
    const isLoggedIn = false; // This should be replaced with actual auth state

    const handleLetsStartLearning = () => {
      if (isLoggedIn) {
        navigate('/dashboard');
      } else {
        navigate('/dashboard'); // For now, always go to dashboard as requested
      }
    };

    return (
      <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">

        {/* Dynamic background elements with enhanced animation */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-virtlab-blue/10 rounded-full blur-3xl animate-pulse-light"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-virtlab-mint/15 rounded-full blur-3xl animate-float" style={{animationDuration: '15s'}}></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-virtlab-yellow/10 rounded-full blur-2xl animate-float" style={{animationDelay: '1s', animationDuration: '20s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s', animationDuration: '25s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-virtlab-softpurple/15 rounded-full blur-xl animate-float" style={{animationDelay: '3s', animationDuration: '18s'}}></div>
        </div>
        <Navbar />
        <main className="flex-grow pt-16 relative z-10">
          {children}
        </main>
        {!isDashboard && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className="relative group">
              </div>
          </div>
        )}
        <Footer />
      </div>
    );
  };

  export default Layout;