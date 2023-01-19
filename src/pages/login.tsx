import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function Login() {
  const [incorrectLogin, setIncorrectLogin] = useState('');
  const [cookie, setCookie] = useCookies(['user']);

  const router = useRouter();

  async function authenticateUser(
    event: HTMLElementEvent<HTMLTextAreaElement>
  ) {
    event.preventDefault();
    const target = event.target;
    const emailaddress = target.emailAddress.value;
    const password = target.password.value;
    // console.log('emailaddress: ', emailaddress, 'password: ', password)
    try {
      const response = await axios.post('/api/controllers/authenticateUser', {
        emailaddress,
        password,
      });

      if (response.status === 201) {
        setCookie('user', response.data.emailaddress, {
          path: '/',
          maxAge: 2592000, // Expires after 30 days
          sameSite: true,
        });
      }
      return router.push('/');
    } catch (error) {
      setIncorrectLogin(
        'Incorrect email or password. Please try again or sign up.'
      );
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={authenticateUser}>
        <input id='emailAddress' type='email' placeholder='Email Address' />
        <input id='password' type='password' placeholder='Password' />
        <input id='submit' type='submit' value='Login'></input>
      </form>
      <div>{incorrectLogin}</div>
    </div>
  );
}
