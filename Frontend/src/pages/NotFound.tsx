import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import heroVideo from '../data/not_found_cody.mp4';

export default function NotFound() {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: attempted to access:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#fffffd] px-4 gap-y-6 md:gap-x-16">
      <div className="w-full md:w-1/3 p-4 text-center md:text-right">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-2">
          {t('notfound.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          {t('notfound.message')}
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {t('notfound.back')}
        </Link>
      </div>
      <div className="w-full md:w-1/3 p-4">
        <video
          src={heroVideo}
          autoPlay loop muted playsInline
          className="w-full h-full object-contain"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
        />
      </div>
    </div>
  );
}
