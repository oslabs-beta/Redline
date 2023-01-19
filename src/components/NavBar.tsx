import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import Logo from '../public/logo.png';
import Login from '../public/login.png';
import Docs from '../public/docs.png'; 
import Github from '../public/github.png'; 
import Monitoring from '../public/monitoring.png'; 

export default function NavBar() {
  return (
    <div className='navBarWrapper'>

      <div className='leftNavBar'>
      <Image id='logo' src={Logo} alt='Redline Logo'/>
      </div>

      <div className = "navSpace"></div>

      <div className='rightNavBar'>

      <a href = '/api/auth/login'>
      <Image id='loginIcon' src={Login} alt='Login Button'/>
      </a>

      <Link href = '/docs'>
      <Image id='docsIcon' src={Docs} alt='Docs Button'/>
      </Link>

      <Link href = '/github'>
      <Image id='githubIcon' src={Github} alt='Github Button'/>
      </Link>

      <Link href = '/monitoring'>
      <Image id='monitoringIcon' src={Monitoring} alt='Monitoring Button'/>
      </Link>
      </div>

    </div>
  );
}
