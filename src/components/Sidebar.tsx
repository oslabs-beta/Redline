import React, { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import { Endpoint } from '../../types/types';
import styles from './styles/SideBar.module.scss';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import deleteUserEndpoint from '../components/sidebarFunctions/deleteUserEndpoint';
import storeUserEndpoint from '../components/sidebarFunctions/storeUserEndpoint';

interface SidebarProps {
  setMetricEndpoint: React.Dispatch<React.SetStateAction<Endpoint | undefined>>;
}

export default function Sidebar({ setMetricEndpoint }: SidebarProps) {
  // store the most recently added host, port, password and nickname in state as well as all the endpoints
  const [host, setHost] = useState('');
  const [port, setPort] = useState<number>();
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [repeatWarning, setRepeatWarning] = useState('');

  const { user } = useUser();

  // get a logged-in users endpoints
  async function getUserEndpoints() {
    try {
      if (user) {
        const response = await axios.get(
          `api/controllers/userEndpoints?emailaddress=${user.name}`
        );
        setEndpoints(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // if a user is logged in, get the endpoints from the database
  useEffect(() => {
    if (user) {
      let data = getUserEndpoints();
      console.log(data);
    }
  }, [user]);

  // stores users who aren't logged-ins' endpoints in session storage
  function handleFormSubmit(event: any) {
    event.preventDefault();
    let repeat: boolean = false;

    for (const object of endpoints) {
      if (object['nickname'] === nickname) repeat = true;
    }

    if (repeat)
      return setRepeatWarning(
        'Warning: endpoint with this nickname already exists, please rename the endpoint and try again.'
      );
    else setRepeatWarning('');

    const newEndpoint: Endpoint = {
      host: host,
      port: port ?? 6739,
      password: password,
      nickname: nickname,
    };

    if (user) {
      storeUserEndpoint(user.name, newEndpoint);
    }

    const previousEndpoints = endpoints;
    setEndpoints([...previousEndpoints, newEndpoint]);

    sessionStorage.setItem(
      'allEndpoints',
      JSON.stringify([...previousEndpoints, newEndpoint])
    );
    sessionStorage.setItem(nickname, JSON.stringify(newEndpoint));
    event.target[0].value = ''; 
    event.target[1].value = ''; 
    event.target[2].value = ''; 
    event.target[3].value = ''; 
  }

  // this ensures that the endpoints in state don't get rewritten
  useEffect(() => {
    const allEndpoints = sessionStorage.getItem('allEndpoints');
    if (allEndpoints !== null) {
      const parsedEndpoints = JSON.parse(allEndpoints);
      setEndpoints(parsedEndpoints);
    }
  }, []);

  // stores the most recently clicked on endpoint in sessionStorage so it can be spun up when metrics are displayed on page.
  function storeCurrentEndpoint(endpoint: string) {
    endpoints.forEach((object) => {
      if (object['nickname'] === endpoint) {
        sessionStorage.setItem('currentEndpoint', JSON.stringify(object));
        setMetricEndpoint(object);
      }
    });
  }

  // deletes endpoint from database/session storage
  function deleteEndpoint(endpoint: string) {
    if (user) {
      deleteUserEndpoint(user.name, endpoint);
    }

    sessionStorage.removeItem(endpoint);
    if (
      JSON.parse(sessionStorage.getItem('currentEndpoint') || '{}').nickname ===
      endpoint
    )
      sessionStorage.removeItem('currentEndpoint');

    const newEndpoints = [];
    for (let data of endpoints) {
      if (data.nickname !== endpoint) {
        newEndpoints.push(data);
      }
    }
    setEndpoints(newEndpoints);
    sessionStorage.setItem('allEndpoints', JSON.stringify(newEndpoints));
  }

  return (
      <div className={styles.formContainer}>
        <form onSubmit={handleFormSubmit} id="addEndpointForm">
          <label>
            Host
            <br />
            <input
              className={styles.input}
              type="text"
              name="host"
              onChange={(event) => {
                setHost(event.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Port
            <br />
            <input
              className={styles.input}
              type="text"
              name="port"
              onChange={(event) => {
                setPort(+event.target.value);
              }}
            />
          </label>
          <br /><br />
          <label>
            Password
            <br />
            <input
              className={styles.input}
              type="password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
          <br /><br />
          <label>
            Nickname
            <br />
            <input
              className={styles.input}
              type="text"
              name="nickname"
              onChange={(event) => {
                setNickname(event.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <div className={styles.repeatWarning}>{repeatWarning}</div>
          <br />
          <button className={styles.addEndpoint} type="submit" role="button">
            <GrAddCircle size={30} color={'313614'} />
          </button>
        </form>
        <div className={styles.endpointWrapper}>
          <br />
          {endpoints.map((object, index) => {
            return (
              <div className={styles.endPointContainer} key={index}>
                <button
                  onClick={() => {
                    deleteEndpoint(object.nickname);
                  }}
                  className={styles.delete}
                  type="submit"
                >
                  <BsTrash size={20} color={'313614'} />
                </button>
                <button
                  onClick={() => {
                    storeCurrentEndpoint(object.nickname);
                  }}
                  className={styles.eachEndpoint}
                  type="submit"
                >
                  {object.nickname}
                </button>
                <br />
              </div>
            );
          })}
        </div>
      </div>
  );
}
