import React from 'react'
import styles from './Table.module.scss'

interface ITable {
	children: React.ReactNode
}

const Table = ({ children }: ITable) => {
	return (
		<div className={styles.table}>
			<table>{children}</table>
		</div>
	)
}

export default Table
