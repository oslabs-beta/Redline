import React, { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import { Endpoint } from '../../types/types';
import styles from './styles/SideBar.module.scss'

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

  // when the form is submitted, it will trigger the function below, adding the new endpoint to state and local storage
  function handleFormSubmit(event: any) {
    event.preventDefault();

    // checks to see if an endpoint with this nickname already exists.
    let repeat: boolean = false;

    for (const object of endpoints) {
      if (object['nickname'] === nickname) repeat = true;
    }

    if (repeat) 
      return alert(
        'Warning: endpoint with this nickname already exists, please rename the endpoint and try again.'
      );

    // if it doesn't exist, run the code below to add the new endpoint
    const newEndpoint: Endpoint = {
      host: host,
      port: port ?? 6739,
      password: password,
      nickname: nickname,
    };

    const previousEndpoints = endpoints;
    setEndpoints([...previousEndpoints, newEndpoint]);

    localStorage.setItem('allEndpoints', JSON.stringify([...previousEndpoints, newEndpoint]));
    localStorage.setItem(nickname, JSON.stringify(newEndpoint));
  }

  // this ensures that the endpoints in state don't get rewritten
  // loads upon refresh
  useEffect(() => {
    const allEndpoints = localStorage.getItem('allEndpoints');
    if (allEndpoints !== null) {
      const parsedEndpoints = JSON.parse(allEndpoints);
      setEndpoints(parsedEndpoints);
    }
  }, []);

  // stores the most recently clicked on endpoint in localStorage so it can be spun up when metrics are displayed on page.
  function storeCurrentEndpoint(endpoint: string) {
    // fire the setter function prop drilled from Main.tsx to set the Main.tsx state for the CurrentEndpoint and set to the clicked endpoint
    endpoints.forEach((object) => {
      if (object['nickname'] === endpoint) {
        localStorage.setItem('currentEndpoint', JSON.stringify(object));
        setMetricEndpoint(object);
      }
    });
  }

  // delete an endpoint when user clicks delete
  function deleteEndpoint(endpoint: string) {
    localStorage.removeItem(endpoint);
    if (
      JSON.parse(localStorage.getItem('currentEndpoint') || '{}').nickname ===
      endpoint
    )
      localStorage.removeItem('currentEndpoint');

    // rewrite using reduce
    const newEndpoints = [];
    for (let data of endpoints) {
      if (data.nickname !== endpoint) {
        newEndpoints.push(data);
      }
    }

    setEndpoints(newEndpoints);
    localStorage.setItem('allEndpoints', JSON.stringify(newEndpoints));
  }

  return (
    <div>
      <section className={styles.formContainer}>
        <form onSubmit={handleFormSubmit} id='addEndpointForm'>
          <label>
            Host
            <br />
            <input
              type='text'
              name='host'
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
              type='text'
              name='port'
              onChange={(event) => {
                setPort(+event.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Password
            <br />
            <input
              type='password'
              name='password'
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Nickname
            <br />
            <input
              type='text'
              name='nickname'
              onChange={(event) => {
                setNickname(event.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <button className={styles.addEndpoint} type='submit' role='button'>
            <GrAddCircle size={30} color={'313614'} />
          </button>
        </form>
        <div>
          <br />
          {endpoints.map((object, index) => {
            return (
              <div className={styles.endpointContainer} key={index}>
                <button
                  onClick={() => {
                    deleteEndpoint(object.nickname);
                  }}
                  className={styles.delete}
                  type='submit'
                >
                  <BsTrash size={20} color={'313614'} />
                </button>
                <button
                  onClick={() => {
                    storeCurrentEndpoint(object.nickname);
                  }}
                  className={styles.eachEndpoint}
                  type='submit'
                >
                  {object.nickname}
                </button>
                <br />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
