import React from 'react';
import Image from 'next/image';
import Logo from '../public/logo.png';

export default function NavBar() {
  return (
    <div className='navBarContainer'>
      <Image id='logo' src={Logo} alt='Redline Logo'/>
    </div>
  );
}
