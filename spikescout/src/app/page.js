"use client";
import { useState } from "react";
import { account, ID } from "../../pages/appwrite";
import Image from 'next/image'
import styles from '../styles/page.module.css'

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const login = async (email, password) => {
    try {    
      const session = await account.createEmailSession(email, password);
      setLoggedInUser(await account.get()); 
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

  if (loggedInUser) {
    return (
      <div>
        <p>Logged in as {loggedInUser.name}</p>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <main>
      <div id={styles.container}>
        <div id={styles.login}>
            <Image
              src={'/spike.png'}
              width={100}
              height={100}
              alt={'Spike Logo'}
            />
            <h1>SpikeScout</h1>
            <div id={styles.login_inner}>
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
            <button id={styles.login_button} type="button" onClick={() => login(email, password)}>
            Login
            </button>
            <button id={styles.login_button} type="button" onClick={register}>
            Register
            </button>
          </div>
        </div>
          <div id={styles.block_right}>
            <div class={styles.slogan}>
              <h2>Precision starts with data.</h2>
            </div>
          </div>
      </div>
    </main>
  )
}