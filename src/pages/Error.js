import React from 'react';

const Error = ({ message }) => {
  return (
    <h1 className="text-center text-red-500 font-bold mt-8 text-3xl">
      {message || 'Bir hata oluştu.'}
    </h1>
  );
};

export default Error;
