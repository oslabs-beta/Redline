import React from 'react';
import NavBar from '../../src/components/NavBar'; 
import Image from 'next/image';
import Luke from '../public/luke.png'; 
import Alan from '../public/alan.png'; 
import Elvin from '../public/elvin.png'; 
import Sakura from '../public/sakura.png'
import styles from '../components/styles/Landing.module.scss'
export default function Landing() {
  return (
    <div>
      <NavBar />
    <div className='team'>
    <Image className={styles.teamPhoto} src={Luke} alt='Luke'/>
    <Image className={styles.teamPhoto} src={Elvin} alt='Elvin'/>
    <Image className={styles.teamPhoto} src={Alan} alt='Alan'/>
    <Image className={styles.teamPhoto} src={Sakura} alt='Sakura'/>
    </div>
    </div>
  )
}