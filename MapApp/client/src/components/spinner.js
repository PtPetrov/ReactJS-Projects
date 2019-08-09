import React from 'react';
import './spinner.css';

export default function Spinner() {
  return (
    <div id='compass'>
      <div id='bezel' />
      <div id='NWSE' className='quad' />
      <div id='NESW' className='quad' />
      <div id='NS' className='quad' />
      <div id='WE' className='quad' />
      <span id='N' className='dir'>
        N
      </span>
      <span id='E' className='dir'>
        E
      </span>
      <span id='S' className='dir'>
        S
      </span>
      <span id='W' className='dir'>
        W
      </span>
      <div id='needle' />
      <div id='axis' />
    </div>
  );
}
