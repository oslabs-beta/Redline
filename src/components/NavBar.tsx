import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import Logo from '../public/logo.png';
import Logout from '../public/logout.png';
import Login from '../public/login.png';
import Docs from '../public/docs.png'; 
import Github from '../public/github.png'; 
import Monitoring from '../public/monitoring.png';
import {useUser} from '@auth0/nextjs-auth0/client';
import styles from './styles/NavBar.module.scss'

export default function NavBar() {
  const { user } = useUser(); 
  // console.log(user); 

  return (
    <div className={styles.navBarWrapper}>

      <div className={styles.leftNavBar}>
      <Link href = '/landing'>
      <Image id={styles.logo} src={Logo} alt='Redline Logo'/>
      </Link>
      </div>

      <div className = {styles.navSpace}></div>

      <div className={styles.rightNavBar}>

      <Link href = '/api/auth/login'>
        {user ? (<Link href = '/api/auth/logout'><Image className={styles.icons}  src={Logout} alt='logout'></Image></Link>) : (<Image className={styles.icons}  src={Login} alt='Login Button'/>)}
      </Link>
    
      
      <Link href = '/docs'>
      <Image className={styles.icons}  src={Docs} alt='Docs Button'/>
      </Link>

      <Link href = 'https://github.com/oslabs-beta/Redline'>
      <Image className={styles.icons}  src={Github} alt='Github Button'/>
      </Link>

      <Link href = '/monitoring'>
      <Image className={styles.icons} src={Monitoring} alt='Monitoring Button'/>
      </Link>
      </div>

    </div>
  );
}
