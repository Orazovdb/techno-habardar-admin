import { GET_CATEGORIES, GET_SEARCHED_CAT } from '@/api/queries/Getters'
import { DELETE_SUBCATEGORIES } from '@/api/queries/Posts'
import PopupConfirm from '@/components/popup/PopUpConfirm'
import PopupPost from '@/components/popup/PopupPosts'
import Input from '@/components/ui/Input'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import Loader from '@/components/ui/loader/Loader'
import Table from '@/components/ui/table/Table'
import tableStyles from '@/components/ui/table/Table.module.scss'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import styles from './Posts.module.scss'

const Posts = () => {
	const [isPopupConfirm, setIsPopupConfirm] = useState(false)
	const [uuid, setUuid] = useState('')
	const [searchPost, setSearchPost] = useState('')

	const { data: dataSearch, refetch } = useQuery(['getSearchedCat'], () =>
		GET_SEARCHED_CAT({
			params: {
				categoryID: '',
				search: searchPost
			}
		})
	)

	const { data, isLoading } = useQuery(['getSubCategories'], () =>
		GET_CATEGORIES()
	)

	const { mutate: mutateDeleteSubCategory } = useMutation({
		mutationKey: ['delete'],
		mutationFn: (data: any) => DELETE_SUBCATEGORIES({ data }),
		async onSuccess() {
			toast.success('Deleted successfully!')
		}
	})
	const popupConfirm = (uuid: any) => {
		setIsPopupConfirm(true)
		setUuid(uuid)
	}

	const deleteSubCategory = (uuid: any) => {
		popupConfirm(uuid.UUID)
		setUuid(uuid)
		mutateDeleteSubCategory({ uuid })
		setIsPopupConfirm(false)
		setTimeout(() => {
			refetch()
		}, 200)
	}

	const [isOpenPopup, setIsOpenPopup] = useState(false)
	const [itemEdit, setItemEdit] = useState<any>(null)

	const edit = (item: any) => {
		setIsOpenPopup(true)
		setItemEdit(item)
	}

	const closePopup = () => {
		setIsOpenPopup(false)
		setItemEdit(null)
	}

	return (
		<div className={styles.dashboard}>
			<Toaster position='top-center' />
			<Input value={searchPost} onChange={e => setSearchPost(e.target.value)} />
			<Button onClick={refetch}>SEARCH</Button>
			<PopupPost
				isOpen={isOpenPopup}
				handleClose={closePopup}
				itemProp={itemEdit}
			/>
			<PopupConfirm
				isOpen={isPopupConfirm}
				handleClose={() => setIsPopupConfirm(false)}
				message='Вы действительно хотите удалить?'
				handleSend={() => deleteSubCategory(uuid)}
			/>
			<div className={styles.header}>
				<h1 className={styles.title}>Посты</h1>
				<Button onClick={() => setIsOpenPopup(true)}>
					<IconComponent icon='plus' />
					Добавить посты
				</Button>
			</div>
			<Table>
				<thead>
					<tr>
						<th>№</th>
						<th>Имя поста</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<div className={tableStyles.loading}>
							<Loader />
						</div>
					) : (
						<React.Fragment>
							{data?.length ? (
								<React.Fragment>
									{data?.map((item, i) => (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{item?.name?.tm}</td>
											<td>
												<div className={tableStyles.actions}>
													<div
														onClick={() => edit(item)}
														className={tableStyles.edit}
													>
														<IconComponent icon='edit' />
													</div>
													<div
														onClick={() => popupConfirm(item?.UUID)}
														className={tableStyles.crash}
													>
														<IconComponent icon='crash' />
													</div>
												</div>
											</td>
										</tr>
									))}
								</React.Fragment>
							) : (
								<tr>
									<td></td>
									<td className={tableStyles.empty}>
										Пусто, добавьте что нибудь...
									</td>
								</tr>
							)}
						</React.Fragment>
					)}
				</tbody>
			</Table>
		</div>
	)
}

export default Posts
