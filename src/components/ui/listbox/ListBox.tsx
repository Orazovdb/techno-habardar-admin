import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { ICategory } from '@/types/types'
import classNames from 'classnames/bind'
import IconComponent from '../icon/Icon'
import styles from './ListBox.module.scss'

const cx = classNames.bind(styles)

interface ChildProps {
	selected: ICategory
	setSelected: (newSelection: ICategory) => void
	data?: ICategory[]
	isError: Boolean
	isShake: Boolean
}

export default function ListBox({
	selected,
	setSelected,
	data,
	isError,
	isShake
}: ChildProps) {
	return (
		<div className={styles.listbox}>
			<Listbox value={selected} onChange={setSelected}>
				<div className={styles.container}>
					<Listbox.Button
						className={cx({
							button: true,
							error: isError,
							shake: isShake
						})}
					>
						{selected.name.tm ? (
							<span>{selected?.name.tm}</span>
						) : (
							<span>Выберите категорию</span>
						)}

						<IconComponent icon='chevronUpDown' />
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave={styles.transition}
						leaveFrom={styles.opacity100}
						leaveTo={styles.opacity0}
					>
						<Listbox.Options className={styles.list}>
							{data?.map((person, personIdx) => (
								<Listbox.Option
									key={personIdx}
									className={({ active }) =>
										`${styles.item} ${active && styles.active}`
									}
									value={person}
								>
									{({ selected }) => (
										<>
											<span
												className={`${styles.span} ${
													selected && `${styles.active}`
												}`}
											>
												{person.name.tm}
											</span>
											{selected ? (
												<span className={styles.icon}>
													<IconComponent icon='tick' />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	)
}
