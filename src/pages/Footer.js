import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>
        Copyright &copy; 2024 by{' '}
        <a
          href="https://github.com/emirberkoncu"
          className="hover:text-blue-600 text-blue-400"
          target="_blank"
        >
          @emirberkoncu
        </a>{' '}
        . All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
