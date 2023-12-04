"use client";
import { useState } from "react";
import { account, ID } from "./appwrite";
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../src/styles/auth.module.css'
import bgimg from '../public/loginbackpng.png'

import App from './app'

export default function Auth() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  // Check if user is not defined before redirecting
  if (loggedInUser) {
    router.push('/app');
  }

  const login = async (email, password) => {
    try {    
      const session = await account.createEmailSession(email, password);
      setLoggedInUser(await account.get());       
      window.location.replace("/app");
    } catch (error) {
      alert(error.message);
    }
  };

  const register = async () => {
    try {
      await account.create(ID.unique(), email, password, name);
      login(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  const loginBackStyle = {
      backgroundImage: `url(${bgimg.src})`,
      width: '100%',
      height: '100vh',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
  };

  if (loggedInUser) {
    const router = useRouter();
    router.push("/app", undefined);

    {/* this needs to be changed to use the router, so that it can be spikescout.com/app */}
  } 
  


  {/* 
    <button id={styles.login_button} type="button" onClick={register}>
    <button id={styles.login_button} type="button" onClick={register}>


    <input
    type="text"
    class={styles.login_input}
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    />
    <input
    type="email"
    class={styles.login_input}
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
    <input
    type="password"
    class={styles.login_input}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
  */}

  return (
    <main>
      <div id={styles.imgContainer}>
        <div id={styles.loginBack} style={loginBackStyle}></div>
      </div>
      <div id={styles.formContainer}>
        <div id={styles.stepCounter}>
          <h3>01 - Login</h3>
        </div>
        <div id={styles.welcomeContainer}>
          <h2>Welcome back!</h2>
          <h3>Login to view your details</h3>
        </div>
        <input
          type="email"
          class={styles.loginInput}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          class={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id={styles.loginButton} type="button" onClick={() => login(email, password)}>
          Login
        </button>
        <a href="" id={styles.forgotPassword}>
          Forgot Password?
        </a>
        <a href="" id={styles.createAccount}>
          Create Account
        </a>
      </div>
    </main>
  )
}
