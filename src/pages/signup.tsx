import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

interface userInfo {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}
export default function Signup() {
  const [cookie, setCookie] = useCookies(['user']);
  const [userExists, setUserExists] = useState(''); 

  const router = useRouter();

  async function createUser(event: HTMLElementEvent<HTMLTextAreaElement>) {
    // logic for sending a post fetch request to the backend passing in the first and last name, email and password
    event.preventDefault();
    const target = event.target;
    const firstname = target.firstName.value;
    const lastname = target.lastName.value;
    const emailaddress = target.emailAddress.value;
    const password = target.password.value;

    try {
      const response = await axios.post('/api/controllers/userHandling', {
        firstname,
        lastname,
        emailaddress,
        password,
      });
      // update the route below to the monitoring page when the monitoring page has been completed
      // if the response is the data object
      console.log('resp status is ', response.status); 
      if (response.status === 201) {
        // set cookies using react-cookies
        setCookie('user', response.data.emailaddress, {
          path: '/',
          maxAge: 2592000, // Expires after 30 days
          sameSite: true,
        });
        return router.push('/');
      }
    } catch (error) {
      setUserExists('User already exists. Please navigate to login page and sign in.')
    }
  }

  return (
    <div className="signup">
      <form onSubmit={createUser}>
        <input id='firstName' type='text' placeholder='First Name' />
        <input id='lastName' type='text' placeholder='Last Name' />
        <input id='emailAddress' type='email' placeholder='Email Address' />
        <input id='password' type='password' placeholder='Password' />
        <input id='submit' type='submit' value='Sign Up'></input>
      </form>
      <div className="userExists">
        {userExists}
      </div>
      <p>
        Already signed up? <Link href='/login'>Log In</Link>
      </p>
    </div>
  );
}
