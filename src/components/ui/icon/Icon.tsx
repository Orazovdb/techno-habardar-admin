import { FC } from 'react'

import icons, { Icons } from '@/icons'

interface IconComponentProps {
	icon: string
	onClick?: () => void
}

const IconComponent: FC<IconComponentProps> = ({
	icon,
	onClick = () => {}
}) => {
	const iconPath = (icons as Icons)[icon]

	return (
		<span
			onClick={onClick}
			className='icon'
			dangerouslySetInnerHTML={{ __html: iconPath }}
		/>
	)
}

export default IconComponent
