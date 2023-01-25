import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import Logo from '../public/logo.png';
import Logout from '../public/logout.png';
import Login from '../public/login.png';
import Github from '../public/github.png'; 
import Monitoring from '../public/monitoring.png';
import Blog from '../public/blog.png';
import {useUser} from '@auth0/nextjs-auth0/client';
import styles from './styles/NavBar.module.scss'

export default function NavBar() {
  const { user } = useUser(); 

  return (
    <div className={styles.navBarWrapper}>

      <div className={styles.leftNavBar}>
      <Link href = '/'>
      <Image id={styles.logo} src={Logo} alt='Redline Logo'/>
      </Link>
      </div>

      <div className = {styles.navSpace}></div>

      <div className={styles.rightNavBar}>

      <Link href = '/api/auth/login'>
        {user ? (<Link href = '/api/auth/logout'><Image className={styles.icons}  src={Logout} alt='logout'></Image></Link>) : (<Image className={styles.icons}  src={Login} alt='Login Button'/>)}
      </Link>
    
      <Link href = 'https://github.com/oslabs-beta/Redline'>
      <Image className={styles.icons}  src={Github} alt='Github Button'/>
      </Link>

      <Link href = '/blog'>
      <Image className={styles.icons} src={Blog} alt='Blog Button'/>
      </Link>

      <Link href = '/monitoring'>
      <Image className={styles.icons} src={Monitoring} alt='Monitoring Button'/>
      </Link>
      </div>

    </div>
  );
}
