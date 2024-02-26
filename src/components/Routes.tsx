import { Route } from '@tanstack/react-location'

import Authors from '@/pages/admin/authors/Authors'
import Categories from '@/pages/admin/categories/Categories'
import Profile from '@/pages/admin/profile/Profile'
import SubCategories from '@/pages/admin/sub-categories/SubCategories'
import Tags from '@/pages/admin/tags/Tags'
import Login from '../pages/login/Login'
import AdminMiddleware from './AdminMiddleware'
import Layout from './Layout/Layout'
import Posts from '@/pages/admin/posts/Posts'

const routes: Route[] = [
	{
		path: '/admin/login',
		element: <Login />
	},

	{
		path: '/admin/profile',
		element: (
			<AdminMiddleware>
				<Layout>
					<Profile />
				</Layout>
			</AdminMiddleware>
		)
	},

	{
		path: '/admin/categories',
		element: (
			<AdminMiddleware>
				<Layout>
					<Categories />
				</Layout>
			</AdminMiddleware>
		)
	},

	{
		path: '/admin/sub-categories',
		element: (
			<AdminMiddleware>
				<Layout>
					<SubCategories />
				</Layout>
			</AdminMiddleware>
		)
	},

	{
		path: '/admin/authors',
		element: (
			<AdminMiddleware>
				<Layout>
					<Authors />
				</Layout>
			</AdminMiddleware>
		)
	},
	{
		path: '/admin/tags',
		element: (
			<AdminMiddleware>
				<Layout>
					<Tags />
				</Layout>
			</AdminMiddleware>
		)
	},

	{
		path: '/admin/posts',
		element: (
			<AdminMiddleware>
				<Layout>
					<Posts />
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
