import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-solid border-t-4 border-teal-500 border-r-transparent border-b-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;