import React from 'react';
import Image from 'next/image';
import Logo from '../public/logo.png';

export default function NavBar() {
  return (
    <div className='navBarContainer'>
      <Image src={Logo} alt='Redline Logo' width={50} height={30} />
    </div>
  );
}
