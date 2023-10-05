import Image from 'next/image'
import styles from '../../styles/dashboard.module.css'

function DashboardHeader() {
    return (
        <div id={styles.dashboard_header}>
            <div id={styles.dashboard_header_left}>
                <Image 
                    src="/spike.png"
                    width={50}
                    height={50}
                    alt='Spike Logo'
                />
                <h1>Dashboard</h1>
            </div>
            <div id={styles.dashboard_header_right}>
                <h3>@username</h3>
            </div>
        </div>
    )
}

export default DashboardHeader;