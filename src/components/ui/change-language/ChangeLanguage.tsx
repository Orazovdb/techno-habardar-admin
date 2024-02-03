import React from 'react'
import styles from './ChangeLanguage.module.scss'

interface Language {
	key: string
	name: string
}

interface LanguagesProps {
	activeLang?: string
	onSelectLanguage: (key: string) => void
}

const ChangeLanguage: React.FC<LanguagesProps> = ({
	activeLang = 'tm',
	onSelectLanguage
}) => {
	const languages: Language[] = [
		{
			key: 'tm',
			name: 'TKM'
		},
		{
			key: 'ru',
			name: 'RUS'
		},
		{
			key: 'en',
			name: 'ENG'
		}
	]

	return (
		<div className={styles.languages}>
			<div className={styles.row}>
				{languages.map(lang => (
					<div
						key={lang.key}
						onClick={() => onSelectLanguage(lang.key)}
						className={`${styles.language} ${
							activeLang === lang.key ? styles.active : ''
						}`}
					>
						<p>{lang.name}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default ChangeLanguage
