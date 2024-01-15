import { Route } from '@tanstack/react-location'

// Authmiddleware && AdminMiddlewre

import Settings from '@/Pages/Settings/Settings'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Login from '../Pages/Login/Login'
import AdminMiddleware from './AdminMiddleware'

// const localeValue: any = localStorage.getItem('language')

const routes: Route[] = [
	{
		path: '/admin',
		element: (
			<AdminMiddleware>
				<Dashboard />
			</AdminMiddleware>
		)
	},

	{
		path: '/settings',
		element: (
			<AdminMiddleware>
				<Settings />
			</AdminMiddleware>
		)
	},

	{
		path: '/login',
		element: <Login />
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
