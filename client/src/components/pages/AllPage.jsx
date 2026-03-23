import { Link } from 'react-router-dom'
import './page.css'

function AllPage({ sneakers }) {
	return (
		<div className='sneakers-continer'>
			{sneakers.map(sneaker => (
				<Link to={`/product/${sneaker.id}`}>
					<div key={sneaker.id} className='card'>
						<img src={sneaker.images[0]} alt={sneaker.name} />

						<p className='title'>{sneaker.name}</p>
						<p className='brand'>{sneaker.brand}</p>
						<p className='color-number'>Colors: {sneaker.colors.length}</p>

						{/* Narx qismi */}
						<div className='price-wrapper'>
							{sneaker.discount_price > 0 ? (
								<>
									<p
										className='price'
										style={{ textDecoration: 'line-through', color: '#999' }}
									>
										{sneaker.price} {sneaker.currency}
									</p>
									<p className='discount'>
										{sneaker.discount_price} {sneaker.currency}
									</p>
								</>
							) : (
								<p className='price'>
									{sneaker.price} {sneaker.currency}
								</p>
							)}
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

export default AllPage
