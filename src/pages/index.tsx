import React, { useEffect, useState } from 'react';
import NavBar from '../../src/components/NavBar';
import Image from 'next/image';
import Luke from '../public/luke.png';
import Alan from '../public/alan.png';
import Elvin from '../public/elvin.png';
import Sakura from '../public/sakura.png';
import styles from '../components/styles/Landing.module.scss';
import { Chart, CategoryScale, registerables } from 'chart.js/auto';
import BarChart from '../components/BarChart';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { style } from '@mui/system';
import { VscGraphLine } from 'react-icons/vsc';
import { BsFillBellFill } from 'react-icons/bs';
import { TbReportAnalytics } from 'react-icons/tb';
import Marquee from 'react-fast-marquee';
import githubLogo from '../public/githubLogo.png';
import linkedinLogo from '../public/linkedinLogo.png';
import DenogresTestimonial from '../public/denogres.png';
import DocketeerTestimonial from '../public/docketeer.png';
import DockwellTestimonial from '../public/dockwell.png';
import OrcastrationTestimonial from '../public/orcastration.png';
import QeraunosTestimonial from '../public/qeraunos.png';
import VSBranchTestimonial from '../public/vsbranch.png';
import CloudbandTestimonial from '../public/cloudband.png';

Chart.register(...registerables);

export default function Landing() {
  const { user } = useUser();
  const [dummyData, setDummyData] = useState<number[][]>([]);

  useEffect(() => {
    const generateData = (): number[][] => {
      const data: number[][] = [];
      for (let i = 0; i < 4; i++) {
        let mem = Math.floor(Math.random() * 101);
        data.push([mem, 100 - mem]);
      }
      return data;
    };
    const interval = setInterval(() => setDummyData(generateData()), 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.landingPage}>
      <NavBar />
      <div className={styles.wrapper}>
        {/* header */}
        <div className={styles.headerChart}>
          <div className={styles.header}>
            <div className={styles.headerHeading}>
            Redis Performance Monitoring with{' '}
            <span style={{ color: '#d55641' }}>Redline</span>.
            </div>
            <Link href="/api/auth/login">
              {user ? (
                <Link href="/monitoring">
                  <button id={styles.button}>GO TO DASHBOARD</button>
                </Link>
              ) : (
                <button id={styles.button}>GET STARTED</button>
              )}
            </Link>
          </div>

          {/* chart */}
          <div className={styles.chart}>
            <BarChart
              barData={dummyData}
              name="Memory Usage"
              labels={['Memory Used', 'Memory Available']}
            />
          </div>
        </div>

        {/* caption */}
        <div className={styles.caption}>
          Redline is a powerful Redis performance metrics visualizer that’s easy
          to set up, free to use, and alerts developers to performance issues,
          so that they can avoid spending time constantly monitoring their Redis
          instances.
        </div>

        {/* features */}
        <div className={styles.keyFeatures}>
          <div className={styles.feature}>
            <VscGraphLine size={30} />
            <h1>Core Redis Metrics</h1>
            <p>
              Visualize key performance metrics to improve the efficiency of
              your Redis instance and diagnose performance issues.
            </p>
          </div>

          <div className={styles.feature}>
            <BsFillBellFill size={30} />
            <h1>Alerts </h1>
            <p>
              Developers can also set up alerts for individual metrics to notify
              them whenever a metric either dips below or exceeds a specified
              value.{' '}
            </p>
          </div>

          <div className={styles.feature}>
            <TbReportAnalytics size={30} />
            <h1>Persisting Data</h1>
            <p>
              If a developer sets up a user account with Redline, their Redis
              cache endpoints will persist whenever they open or close the
              website.
            </p>
          </div>
        </div>
        {/* testimonials */}
        <Marquee style={{'width': '90%', 'height': '260px'}}
        >
          <Image
            src={QeraunosTestimonial}
            alt=""
            className={styles.testimonial}
          />
          <Image
            src={DocketeerTestimonial}
            alt=""
            className={styles.testimonial}
          />
          <Image
            src={DenogresTestimonial}
            alt=""
            className={styles.testimonial}
          />
          <Image
            src={OrcastrationTestimonial}
            alt=""
            className={styles.testimonial}
          />
          <Image
            src={VSBranchTestimonial}
            alt=""
            className={styles.testimonial}
          />
          <Image
            src={CloudbandTestimonial}
            alt=""
            className={styles.testimonial}
          />
          <Image
            src={DockwellTestimonial}
            alt=""
            className={styles.testimonial}
          />
        </Marquee>

        <div className={styles.team}>
          <div className={styles.person}>
            <Image className={styles.teamPhoto} src={Luke} alt="Luke" />
            <h2>LUKE DRISCOLL</h2>
            <p>software engineer</p>
            <Link href="https://github.com/LukeDriscoll4">
              <Image
                className={styles.logo}
                alt="githubLogo"
                src={githubLogo}
              ></Image>
            </Link>

            <Link href="https://www.linkedin.com/in/luke-driscoll/">
              <Image
                className={styles.logo}
                alt="linkedinLogo"
                src={linkedinLogo}
              ></Image>
            </Link>
          </div>

          <div className={styles.person}>
            <Image className={styles.teamPhoto} src={Elvin} alt="Elvin" />
            <h2>ELVIN YUEN</h2>
            <p>software engineer</p>
            <Link href="https://github.com/elvinyuen">
              <Image
                className={styles.logo}
                alt="githubLogo"
                src={githubLogo}
              ></Image>
            </Link>
            <Link href="https://www.linkedin.com/in/elvinyuen/">
              <Image
                className={styles.logo}
                alt="linkedinLogo"
                src={linkedinLogo}
              ></Image>
            </Link>
          </div>

          <div className={styles.person}>
            <Image className={styles.teamPhoto} src={Alan} alt="Alan" />
            <h2>ALAN PERNG</h2>
            <p>software engineer</p>
            <Link href="https://github.com/aperng31">
              <Image
                className={styles.logo}
                alt="githubLogo"
                src={githubLogo}
              ></Image>
            </Link>
            <Link href="https://www.linkedin.com/in/alanperng/">
              <Image
                className={styles.logo}
                alt="linkedinLogo"
                src={linkedinLogo}
              ></Image>
            </Link>
          </div>

          <div className={styles.person}>
            <Image className={styles.teamPhoto} src={Sakura} alt="Sakura" />
            <h2>SAKURA AKIYAMA</h2>
            <p>software engineer</p>
            <Link href="https://github.com/sakurakiyama">
              <Image
                className={styles.logo}
                alt="githubLogo"
                src={githubLogo}
              ></Image>
            </Link>
            <Link href="https://www.linkedin.com/in/sakura-akiyama-bowden/">
              <Image
                className={styles.logo}
                alt="linkedinLogo"
                src={linkedinLogo}
              ></Image>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
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
