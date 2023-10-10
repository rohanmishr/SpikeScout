"use client"
import '../styles/globals.css'
import styles from '../styles/page.module.css'

export default function Main() {
    return (
        <main>
            <div id={styles.header}>
                <div id={styles.left}>
                    <h2>SpikeScout</h2>
                </div>
                <div id={styles.right}>
                    <a href="/"><h2>Solutions</h2></a>
                    <a href="/"><h2>About us</h2></a>
                    <a href="/"><h2>Login</h2></a>
                    <button id={styles.signup}>Sign up</button>
                </div>
            </div>
        </main>
    )
}   