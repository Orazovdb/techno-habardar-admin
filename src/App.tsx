import { Outlet, ReactLocation, Router } from '@tanstack/react-location'

import Layout from './components/Layout/Layout'
import routes from './components/Routes'

const location = new ReactLocation()

const App = () => {
	return (
		<div className='App'>
			<Router location={location} routes={routes}>
				<Layout>
					<Outlet />
				</Layout>
			</Router>
		</div>
	)
}

export default App
