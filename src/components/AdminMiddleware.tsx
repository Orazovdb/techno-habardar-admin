import { useNavigate } from '@tanstack/react-location'
import { ReactNode, useEffect, useState } from 'react'

/// comps
import Preloader from '../components/ui/Preloader/Preloader'

type AdminMiddlewareProps = {
	children: ReactNode
}

const AdminMiddleware = (props: AdminMiddlewareProps) => {
	const { children } = props
	const navigate = useNavigate()
	const [loading, setLoading] = useState<boolean>(false)
	useEffect(() => {
		const token = localStorage.getItem('Authorization')

		setLoading(true)
		if (token == undefined) {
			navigate({ to: '/admin/login', replace: true })
		} else if (token) {
			// navigate({ to: '/admin/dashboard', replace: true })
		}
		setLoading(false)
	}, [])

	return (
		<div className='h-100'>{loading ? <Preloader /> : <>{children}</>}</div>
	)
}

export default AdminMiddleware
