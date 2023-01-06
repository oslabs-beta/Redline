import React, { useState, useEffect } from 'react';
// import { Inter } from '@next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// const dM_Serif_Display = DM_Serif_Display({
//   weight: '400',
//   subsets: ['latin'],
// });
export default function Sidebar() {
  interface Endpoint {
    host: string;
    port: string;
    password: string;
    nickname: string;
  }

  // store the most recently added host, port, password and nickname in state.
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  // all endpoints that the user will enter will be stored below as an array of objects.
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);

  /*
    this is what would be stored in state for example: 
    [
      {host: 'localhost', port: '3000', password: 'codesmith', nickname: 'app2'},
    {host: 'localhost', port: '8080', password: 'hello', nickname: 'app1'}]
    */

  // when the form is submitted, it will trigger the function below.
  function handleFormSubmit(event: any) {
    event.preventDefault();

    // create a new object storing the key value pairs to connect to redis instance.
    const newEndpoint: Endpoint = {
      host: host,
      port: port,
      password: password,
      nickname: nickname,
    };

    // adding the newly added endpoint to the endpoint state
    const previousEndpoints = endpoints;
    previousEndpoints.push(newEndpoint);
    setEndpoints(previousEndpoints);

    // keeping this in here for now because it might be a good way to display the endpoints on the screen for users to toggle between
    // set all endpoints in local storage.
    localStorage.setItem('allEndpoints', JSON.stringify(endpoints));
    // which one is better below? recommend the first one because its easier to digest if another developer/user came into our codebase/looked at localstorage and could figure out what the key value pairs. more intuitive.
    localStorage.setItem(nickname, JSON.stringify(newEndpoint));
    localStorage.setItem(nickname, `${host}, ${port}, ${password}`);

    // when the button is clicked, it should add the nickname as a button below the form. 
  }

  return (
    <main>
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
          </label>{' '}
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
          </label>{' '}
          <br />
          <label>
            Password
            <br />
            <input
              type='text'
              name='password'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>{' '}
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
            <br />
          </label>
          <br />
          {/* <input id='formButton' type='submit' value='Submit' /> */}
          <button type='submit'>
            <img
              id='addEndpointButton'
              alt='submit'
              src='https://i.imgur.com/HvzMK75.png'
            />
          </button>
        </form>
      </section>
    </main>
  );
}
