"use client"
import '../styles/globals.css'
import styles from '../styles/page.module.css'
import Image from "next/image"

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
                <div id={styles.container}>
                    <div id={styles.contLeft}> {/* pulled a funny and made the left side the right side */}
                    <Image src="/main.svg" width={500} height={500} />
                    </div>
                    <div id={styles.contRight}>
                        <div id={styles.textContainer}>
                            <h1>Your warehouse for all things FRC.</h1>
                            <h2>Manage your team, store your data, supercharge your gameplay.</h2>
                            <button id={styles.learnMore}>Learn More</button>
                        </div>
                    </div>
                </div>
                <div id={styles.main}>
                    <div id={styles.infoHero}>
                        <div id={styles.heroContainer}>
                            <div id={styles.heroTitle}>
                                <h1>How we can help</h1>
                            </div>
                            <div class={styles.heroFeatures}>
                                <div class={styles.number}>
                                    <h2>1</h2>
                                </div>
                            </div>
                            <div class={styles.heroFeatures}>
                                <div class={styles.number}>
                                    <h2>2</h2>
                                </div>
                            </div>
                            <div class={styles.heroFeatures}>
                                <div class={styles.number}>
                                    <h2>3</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}   