import React from 'react';

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-3zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.92V13H5V6.3l7-3.11v9.8z"/>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
      <nav className="container mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <ShieldIcon />
            <span className="text-xl font-bold text-slate-900">Hệ thống Cảnh báo sớm</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Trang chủ</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Trợ giúp</a>
          </div>
        </div>
      </nav>
    </header>
  );
};