import { CategoriesTypes } from '@/api/Types/queryReturnTypes/Categories'
import styles from './ScrollArea.module.scss'

interface IScrollAreaArray {
	names?: CategoriesTypes[]
}

const ScrollArea = ({ names }: IScrollAreaArray) => {
	return (
		<ul className={styles.scrollArea}>
			{names?.map((text, index) => (
				<li key={index}>{text.name.tm}</li>
			))}
		</ul>
	)
}

export default ScrollArea
