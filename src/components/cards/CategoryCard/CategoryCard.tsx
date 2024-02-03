import { ICategory } from '@/types/types'
import { FC } from 'react'

interface CategoryCardProps {
	data: ICategory
}

const CategoryCard: FC<CategoryCardProps> = ({ data }) => {
	return <div>{data?.name?.tm}</div>
}

export default CategoryCard
