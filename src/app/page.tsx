'use client'

import Header from '../components/Header';
import PdfUploader from '../components/PdfUploader';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`h-screen p-4 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <PdfUploader />
    </div>
  );
};

export default Home;