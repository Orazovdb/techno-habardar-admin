import { Outlet, ReactLocation, Router } from '@tanstack/react-location'

import routes from './components/Routes'

const location = new ReactLocation()

const App = () => {
	return (
		<div className='App'>
			<Router location={location} routes={routes}>
				<Outlet />
			</Router>
		</div>
	)
}

export default App
