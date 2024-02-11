import classNames from 'classnames/bind'
import * as React from 'react'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

interface ButtonProps {
	children: React.ReactNode
	notActive?: Boolean
	deleteButton?: Boolean
	onClick?: (e: any) => void
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, notActive, deleteButton, onClick }, ref) => {
		return (
			<button
				onClick={onClick}
				className={`${cx({
					button: true,
					notActive: notActive,
					delete: deleteButton
				})}`}
				ref={ref}
			>
				{children}
			</button>
		)
	}
)
Button.displayName = 'Button'

export { Button }
