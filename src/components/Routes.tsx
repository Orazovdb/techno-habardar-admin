import { Route } from '@tanstack/react-location'

import Categories from '@/pages/admin/categories/Categories'
import Profile from '@/pages/admin/profile/Profile'
import Dashboard from '@/pages/admin/dashboard/Dashboard'
import Login from '../pages/login/Login'
import AdminMiddleware from './AdminMiddleware'
import Layout from './Layout/Layout'

const routes: Route[] = [
	{
		path: '/admin/login',
		element: <Login />
	},

	{
		path: '/admin/profile',
		element: (
			<AdminMiddleware>
				<Layout title='Изменить профиль'>
					<Profile />
				</Layout>
			</AdminMiddleware>
		)
	},

	{
		path: '/admin/dashboard',
		element: (
			<AdminMiddleware>
				<Layout title='Главная'>
					<Dashboard />
				</Layout>
			</AdminMiddleware>
		)
	},

	{
		path: '/admin/categories',
		element: (
			<AdminMiddleware>
				<Layout title='Категории'>
					<Categories />
				</Layout>
			</AdminMiddleware>
		)
	}

	// {
	// 	path: '/cart',
	// 	element: (
	// 		<AuthMiddleware>
	// 			<Cart />
	// 		</AuthMiddleware>
	// 	)
	// },
	// {
	// 	path: '/upload-image',
	// 	children: [
	// 		{
	// 			path: '/',
	// 			element: (
	// 				<AuthMiddleware withLayout={true}>
	// 					<UploadModels />
	// 				</AuthMiddleware>
	// 			)
	// 		},
	// 		{
	// 			path: ':modelGuid',
	// 			element: (
	// 				<AuthMiddleware>
	// 					<UploadModels />
	// 				</AuthMiddleware>
	// 			)
	// 		}
	// 	]
	// },
	// {
	// 	path: '/admin-control',
	// 	element: (
	// 		<AdminMiddleware withLayout>
	// 			<Admin />
	// 		</AdminMiddleware>
	// 	)
	// },
	// {
	// 	path: '/contactus',
	// 	element: (
	// 		<AdminMiddleware withLayout>
	// 			<Contactus />
	// 		</AdminMiddleware>
	// 	)
	// }
]

export default routes
