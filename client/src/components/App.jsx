import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './app.css'
import Footer from './footer/Footer'
import Header from './header/Header'
import Hero from './hero/Hero'
import AllPage from './pages/AllPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import SinglePage from './pages/SinglePage'

function App() {
	const [sneakers, setSneakers] = useState([])

	useEffect(() => {
		const fetchSneakirs = async () => {
			const res = await fetch('https://e-commorce-1.onrender.com/api/products')
			const data = await res.json()
			setSneakers(data)
		}
		fetchSneakirs()
	}, [])

	return (
		<div>
			<Header />
			<Routes>
				<Route
					path='/'
					element={sneakers.map(sneaker => (
						<Hero key={sneaker.id} sneaker={sneaker} />
					))}
				/>
				<Route path='/all' element={<AllPage sneakers={sneakers} />} />
				<Route
					path='/product/:id'
					element={<SinglePage sneakers={sneakers} />}
				/>
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/*' element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App
