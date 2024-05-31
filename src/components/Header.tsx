import React from 'react';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface HeaderProps {
    toggleDarkMode: () => void;
    isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, isDarkMode }) => {
    return (
        <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">PDF to CSV/Excel Converter</h1>
            <button onClick={toggleDarkMode} className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="mr-2" />
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </header>
    );
};

export default Header;
