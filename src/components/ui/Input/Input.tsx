import { capitalize } from '@/utils/helpers'
import classNames from 'classnames/bind'
import React, { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

const cx = classNames.bind(styles)

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	/** @default medium */
	fontSize?: 'small' | 'medium' | 'big'
	/** @defualt medium */
	fontWeight?: 'normal' | 'medium' | 'bold'
	autoFocus?: boolean
	label?: string
	flex?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(props, ref): JSX.Element => {
		const {
			fontSize = 'medium',
			fontWeight = 'medium',
			className,
			autoFocus,
			label,
			flex = styles.flex
		} = props

		return (
			<div style={{ flex: `${flex}` }} className={styles.inputWrapper}>
				{label && <label className={styles.label}>{label}</label>}
				<input
					autoFocus={autoFocus}
					ref={ref}
					{...props}
					className={`${className}  ${cx({
						input: true,
						[`fontSize${capitalize(fontSize)}`]: true,
						[`fontWeight${capitalize(fontWeight)}`]: true
					})}
      `}
				/>
			</div>
		)
	}
)

export default Input
