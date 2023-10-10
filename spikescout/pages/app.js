import '../src/styles/globals.css'
import styles from '../src/styles/app.module.css'
import { Inter } from 'next/font/google'
import React from 'react'
import Image from 'next/image'
import Team from '../pages/api/Team'
import CalendarEvent from '../pages/api/CalendarEvent'
import CalendarDate from '../pages/api/CalendarDate'
import JoinTeam from '../pages/join-team'

// components
import AppPanel from '../src/components/App/AppPanel'

const inter = Inter({ subsets: ['latin'] })
const TestTeam = new Team(999, "TestTeam", "Las Vegas, Nevada");
TestTeam.events.push(new CalendarEvent(new CalendarDate(10, 10, 2023), "Test Event", "An event description."));
TestTeam.events.push(new CalendarEvent(new CalendarDate(10, 10, 2023), "Test Event 2", "An event description."));

export default function App({ user }) {
    /*if((user ?? {team:undefined}).team == undefined) {
        return (
            <JoinTeam />
        )
    }*/
    const [tab, switchTab] = React.useState("dashboard");

    const Guest = {
        name: "Not logged in",
        team: TestTeam
    }

    function tabSwitchHandler(t) {
        return () => {
            switchTab(t);
        }
    }

    return (
        <main className={inter.className}>
            <div id={styles.app}>
                <div id={styles.app_header}>
                    <div id={styles.app_header_left}>
                        <Image 
                            src="/spike.png"
                            width={50}
                            height={50}
                            alt='Spike Logo'
                        />
                        <h1>SpikeScout</h1>
                    </div>
                    <div id={styles.app_header_right}>
                        <h3>{(user ?? Guest).name}</h3>
                    </div>
                </div>
                <div id={styles.app_content}>
                    <div id={styles.app_sidebar}>
                        <button onClick={tabSwitchHandler("dashboard")} class={styles.app_sidebar_button} id={styles.dashboard_button}>Dashboard</button>
                        <button onClick={tabSwitchHandler("calendar")} class={styles.app_sidebar_button} id={styles.calendar_button}>Calendar</button>
                        <button onClick={tabSwitchHandler("analytics")} class={styles.app_sidebar_button} id={styles.analytics_button}>Analytics</button>
                        <button onClick={tabSwitchHandler("scout")} class={styles.app_sidebar_button} id={styles.scout_button}>Scout</button>
                        <button onClick={tabSwitchHandler("options")} class={styles.app_sidebar_button} id={styles.options_button}>Options</button>
                    </div>
                    <div id={styles.app_panel}>
                        <h1>{tab[0].toUpperCase() + tab.slice(1, tab.length)}</h1>
                        <AppPanel tab={tab} team={(user ?? Guest).team} user={(user ?? Guest)} />
                    </div>
                </div>
            </div>
        </main>
    )
}