import React from 'react';
import NavBar from '../../src/components/NavBar'; 
import Image from 'next/image';
import Luke from '../public/luke.png'; 
import Alan from '../public/alan.png'; 
import Elvin from '../public/elvin.png'; 
import Sakura from '../public/sakura.png'
import styles from '../components/styles/Landing.module.scss'
import { GetServerSideProps } from 'next';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
export default function Landing() {
  // console.log('landing', props)
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { user } = useUser();

//   return { props: {'hello': 'world'} }
// }

// export const getServerSidePropsResultWithSession: GetServerSidePropsResult = () => {

// }

// export const getServerSideProps: GetServerSideProps = ({
//   async getServerSideProps(context) {
//     const session = getSession(context.req, context.res);
//     console.log(session);
//     return { props: { session } }
//   }
// })
