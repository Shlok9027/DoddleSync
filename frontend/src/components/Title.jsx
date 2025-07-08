import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex flex-col items-start sm:items-center gap-2 mb-6 group">
      <div className="inline-flex items-baseline gap-2 transition-all duration-300 ease-in-out group-hover:scale-105">
        <p className="text-gray-700 text-3xl sm:text-4xl font-semibold drop-shadow-md group-hover:text-purple-500">
          {text1}
        </p>
        <span className="text-purple-700 text-3xl sm:text-4xl font-bold tracking-wide transition-all duration-300 group-hover:text-purple-900 group-hover:tracking-wider">
          {text2}
        </span>
      </div>
      
      <div className="w-16 sm:w-24 h-[3px] bg-gradient-to-r from-purple-500 to-purple-700 rounded-full shadow-md 
        transition-all duration-300 ease-in-out group-hover:w-28 group-hover:h-[4px] group-hover:from-purple-400 group-hover:to-purple-900">
      </div>
    </div>
  );
};

export default Title;
