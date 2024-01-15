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
		// const token = value ? value : ''

		setLoading(true)
		if (token == undefined) {
			console.log('hello')
			navigate({ to: '/login', replace: true })
		} else if (token) {
			console.log('Open privated page!!!')
			navigate({ to: '/admin/', replace: true })
		}
		setLoading(false)
	}, [])

	return <div>{loading ? <Preloader /> : <>{children}</>}</div>
}

export default AdminMiddleware
