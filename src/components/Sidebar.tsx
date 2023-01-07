import React, { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';

// declare the type of the props (setter function)

// prop drill the setter function from Main.tsx to props
export default function Sidebar() {
  interface Endpoint {
    host: string;
    port: string;
    password: string;
    nickname: string;
  }

  // store the most recently added host, port, password and nickname in state as well as all the endpoints
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);

  // when the form is submitted, it will trigger the function below, adding the new endpoint to state and local storage
  function handleFormSubmit(event: any) {
    event.preventDefault();

    const newEndpoint: Endpoint = {
      host: host,
      port: port,
      password: password,
      nickname: nickname,
    };

    const previousEndpoints = endpoints;
    previousEndpoints.push(newEndpoint);
    setEndpoints(previousEndpoints);

    localStorage.setItem('allEndpoints', JSON.stringify(endpoints));
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
      if (Object.keys(object).find((key) => object['nickname'] === endpoint)) {
        // we do this when an endpoint is clicked
        localStorage.setItem('currentEndpoint', JSON.stringify(object));
      }
    });
  }

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
      <section className='formContainer'>
        <form onSubmit={handleFormSubmit}>
          <label>
            Host
            <br />
            <input
              type='text'
              name='host'
              value={host}
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
              value={port}
              onChange={(event) => {
                setPort(event.target.value);
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
              value={password}
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
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <button className='addEndpoint' type='submit' role='button'>
            <GrAddCircle size={30} />
          </button>
        </form>
        <div>
          <br />
          {
            // when the button above is clicked, it adds an endpoint below the form. the endpoint is a clickable button. When clicked, the endpoint is stored in localStorage under 'currentEndpoint' so it can spin up metrics wherever thats happening.
            // ****still need to add the logic to delete an endpoint and spin up metrics when endpoint is clicked****
            endpoints.map((object, index) => {
              return (
                <div className='endpointContainer' key={index}>
                  <button
                    onClick={() => {
                      deleteEndpoint(object.nickname);
                    }}
                    className='delete'
                    type='submit'
                  >
                    <BsTrash size={20} />
                  </button>
                  <button
                    onClick={() => {
                      storeCurrentEndpoint(object.nickname);
                    }}
                    className='eachEndpoint'
                    type='submit'
                  >
                    {object.nickname}
                  </button>
                  <br />
                </div>
              );
            })
          }
        </div>
      </section>
    </div>
  );
}
