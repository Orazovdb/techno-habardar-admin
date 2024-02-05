import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { ICategory } from '@/types/types'
import IconComponent from '../icon/Icon'
import styles from './ListBox.module.scss'

const people = [
	{ name: 'Wade Cooper' },
	{ name: 'Arlene Mccoy' },
	{ name: 'Devon Webb' },
	{ name: 'Tom Cook' },
	{ name: 'Tanya Fox' },
	{ name: 'Hellen Schmidt' }
]

interface IProp {
	data?: Array<ICategory>
}

export default function ListBox({ data }: IProp) {
	const [selected, setSelected] = useState(
		data && data.length > 0 ? data[0] : null
	)
	console.log(selected)

	return (
		<div className={styles.listbox}>
			<Listbox value={selected} onChange={setSelected}>
				<div className={styles.container}>
					<Listbox.Button className={styles.button}>
						<span>{selected?.name.tm}</span>
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
