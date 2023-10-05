import '../src/styles/globals.css'
import styles from '../src/styles/dashboard.module.css'
import { Inter } from 'next/font/google'

// components
import DashboardHeader from '../src/components/dashboard/DashboardHeader'
import DashboardPanel from '../src/components/dashboard/DashboardPanel'
import DashboardSidebar from '../src/components/dashboard/DashboardSidebar'

const inter = Inter({ subsets: ['latin'] })

export default function Dashboard() {
    return (
        <main className={inter.className}>
            <div id={styles.dashboard}>
                <DashboardHeader />
                <div id={styles.dashboard_content}>
                    <DashboardSidebar />
                    <DashboardPanel />
                </div>
            </div>
        </main>
    )
}