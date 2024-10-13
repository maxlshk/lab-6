import React from 'react';
import { CloudIcon } from '@heroicons/react/24/solid';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { clearTokens } from '../utils/auth';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    clearTokens();
    navigate('/login');
  };

  return (
    <nav className="bg-white/65 border-b border-gray-200/65">
      <div className="container mx-auto max-w-[1400px] flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <CloudIcon className="h-6 w-6 text-blue-500 mr-2" />
          <span className="text-xl font-semibold text-gray-800">
            WeatherApp
          </span>
        </div>
        <Button variant="filled" size="sm" color="black" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
