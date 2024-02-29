import classNames from 'classnames/bind'
import React, { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

const cx = classNames.bind(styles)

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	autoFocus?: boolean
	label?: string
	isError?: boolean
	isShake?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, autoFocus, label, isError, isShake, ...rest },
		ref
	): JSX.Element => {
		return (
			<div className={styles.inputWrapper}>
				{label && <label className={styles.label}>{label}</label>}
				<input
					autoFocus={autoFocus}
					ref={ref}
					{...rest}
					className={`${className} ${cx({
						input: true,
						error: isError,
						shake: isShake
					})}`}
				/>
			</div>
		)
	}
)

export default Input
