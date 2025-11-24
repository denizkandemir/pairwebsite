import React from 'react';

const Xmark = ({ fill, width, height }) => {
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 32 32" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="cross">
        <line 
          x1="7" 
          x2="25" 
          y1="7" 
          y2="25" 
          style={{
            fill: 'none',
            stroke: fill,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: '2px'
          }} 
        />
        <line 
          x1="7" 
          x2="25" 
          y1="25" 
          y2="7" 
          style={{
            fill: 'none',
            stroke: fill,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: '2px'
          }} 
        />
      </g>
    </svg>
  );
};

export default Xmark;
