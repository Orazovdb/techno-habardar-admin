import React from 'react'
import Header from './Header/Header'
import styles from './Layout.module.scss'
import Sidebar from './Sidebar/Sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.layout}>
			<Sidebar />
			<div className={styles.row}>
				<Header />
				<div className={styles.body}>{children}</div>
			</div>
		</div>
	)
}

export default Layout
