import { useNavigate } from '@tanstack/react-location'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import { axiosInstance } from '../../api/axiosInstance'

import toast, { Toaster } from 'react-hot-toast'

import { Button } from '@/components/ui/button/Button'
import styles from './Login.module.scss'

interface formikValues {
	login: string
	password: string
}

const Login = () => {
	const mutation = useMutation(data => axiosInstance.post('/admin/login', data))
	const navigate = useNavigate()

	const formik = useFormik<formikValues>({
		initialValues: {
			// login: 'login',
			login: 'admin@admin.com',
			// password: '1234'
			password: 'bookkeeper_2023'
		},
		validationSchema: yup.object({
			login: yup.string().min(1, `3 sozden`).required(`required!!!`),
			password: yup.string().min(1, `password`).required(`required!!!`)
		}),
		onSubmit: async (values: any, { resetForm }) => {
			try {
				const { status, data } = await mutation.mutateAsync(values)
				if (data) {
					localStorage.setItem('Authorization', data.data.token)
					toast.success('uspeshno')
					resetForm()
					navigate({ to: '/admin/categories', replace: true })
				} else {
					toast.error(`Username or password error`)
				}
			} catch (error: any) {
				console.error(error)
			}
		}
	})

	return (
		<div className={styles.login}>
			<Toaster position='top-right' reverseOrder={false} />
			<div className={styles.row}>
				<div className={styles.left}>
					<div className={styles.circle}></div>
					<h1 className={styles.title}>Techno-habardar</h1>
				</div>
				<div className={styles.right}>
					<div className={styles.box}>
						<form onSubmit={formik.handleSubmit}>
							<h1 className={styles.title}>Login</h1>
							<div className={styles.body}>
								<div className={styles.username}>
									<input
										type='search'
										autoComplete='off'
										onChange={formik.handleChange}
										name='login'
										placeholder='Your username...'
										// value='login'
										value='admin@admin.com'
									/>
									{formik.touched.login && formik.errors.login ? (
										<div className={styles.requiredField}>
											{formik.errors.login}
										</div>
									) : null}
								</div>
								<div className={styles.password}>
									<input
										type='password'
										autoComplete='off'
										onChange={formik.handleChange}
										name='password'
										placeholder='Your password...'
										// value='1234'
										value='bookkeeper_2023'
									/>
									{formik.touched.password && formik.errors.password ? (
										<div className={styles.requiredField}>
											{formik.errors.password}
										</div>
									) : null}
								</div>
							</div>
							<Button>Login</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
