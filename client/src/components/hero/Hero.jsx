import { Link } from 'react-router-dom'
import './hero.css'

function Hero({ sneaker }) {
	return (
		<div className='hero'>
			<div className='image'>
				<img src={sneaker.images[0]} alt='' />
			</div>
			<div className='info'>
				<h1 className='sneakers-title'>{sneaker.name}</h1>
				<p className='descr'>{sneaker.description}</p>
				<Link to={`/product/${sneaker.id}`}>
					<button className='buy-btn'>Xarid qilish</button>
				</Link>
			</div>
		</div>
	)
}

export default Hero
