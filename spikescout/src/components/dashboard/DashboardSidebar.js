import styles from '../../styles/dashboard.module.css'
import React from 'react'

function DashboardSidebar() {
    const [tab, switchTab] = React.useState("datasets");
    function tabSwitchHandler(t) {
        return () => {
            switchTab(t);
        }
    }

    return (
        <div id={styles.dashboard_sidebar}>
            <button onClick={tabSwitchHandler("datasets")} class={styles.dashboard_sidebar_button} id={styles.datasets_button}>Datasets</button>
            <button onClick={tabSwitchHandler("options")} class={styles.dashboard_sidebar_button} id={styles.options_button}>Options</button>
            <button onClick={tabSwitchHandler("analytics")} class={styles.dashboard_sidebar_button} id={styles.analytics_button}>Analytics</button>
            <h4>{tab}</h4>
        </div>
    )
}

export default DashboardSidebar;