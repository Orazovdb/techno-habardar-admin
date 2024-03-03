import React, { useRef } from 'react'

import { useDropdown } from '@/lib/dropdown'
import { ICategory } from '@/types/types'
import { Button } from '../button/Button'
import IconComponent from '../icon/Icon'
import './MultiSelect.scss'

interface Props {
	categories?: ICategory[]
	selectedCategories?: ICategory[]
	selectCategory: (category: ICategory, parent: ICategory | null) => void
	deleteCategory: (category: ICategory) => void
}

const MultiSelect: React.FC<Props> = ({
	categories,
	selectedCategories,
	selectCategory,
	deleteCategory
}) => {
	const { showDropdown, closeDropdown, openDropdown } = useDropdown()
	const dropdownBodyRef = useRef<HTMLDivElement>(null)
	const dropdownMenuRef = useRef<HTMLDivElement>(null)

	return (
		<div className='article-categories'>
			<div className='article-categories__dropdown'>
				<div ref={dropdownBodyRef} className='article-category-dropdown'>
					<div className='article-category-dropdown__button'>
						<Button
							onClick={showDropdown ? closeDropdown : openDropdown}
							// title={t('selectCategory')}
							// prevIcon="grading"
							// appendIcon="chevronDown"
							// styles="secondary"
						>
							Выберите категории
							<IconComponent icon='chevronBottom' />
						</Button>
					</div>
					{showDropdown && (
						<div
							ref={dropdownMenuRef}
							className='article-category-dropdown__menu'
						>
							{categories?.map(category => (
								<div
									key={category.UUID}
									className='article-category-dropdown__item-box'
								>
									<div
										onClick={() => selectCategory(category, null)}
										className='article-category-dropdown__item-button'
									>
										{/* <p>
											{locale === 'tm' ? category.name_tm : category.name_ru}
										</p> */}
										{category.name.tm}
										{category.sub_categories?.length && (
											<IconComponent icon='chevronRight' />
										)}
									</div>
									{category.sub_categories?.length && (
										<div className='article-category-dropdown__sub'>
											<div className='article-category-dropdown__sub-menu'>
												{category.sub_categories.map(subCategory => (
													<div
														key={subCategory.UUID}
														onClick={() =>
															selectCategory(subCategory, category)
														}
														className='article-category-dropdown__item-button'
													>
														<p>
															{/* {locale === 'tm'
																? subCategory.name_tm
																: subCategory.name_ru} */}
															{/* {subCategory.name_ru} */}
															{subCategory.name.tm}
														</p>
													</div>
												))}
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			{selectedCategories?.map((selectedCat, i) => (
				<div key={i} className='article-categories__selected-category'>
					<React.Fragment>
						{selectedCat.sub_categories ||
						selectedCat.sub_categories === null ? (
							<>
								<p>
									<span>кат/</span>
									<span>{selectedCat.name.tm}</span>
								</p>
								<button onClick={() => deleteCategory(selectedCat)}>
									<IconComponent icon='crash' />
								</button>
							</>
						) : (
							<>
								<p>
									<span>суб-кат/</span>
									<span>{selectedCat.name.tm}</span>
								</p>
								<button onClick={() => deleteCategory(selectedCat)}>
									<IconComponent icon='crash' />
								</button>
							</>
						)}
					</React.Fragment>
				</div>
			))}
		</div>
	)
}

export default MultiSelect
