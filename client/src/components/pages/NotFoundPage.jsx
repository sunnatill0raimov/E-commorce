import { Link } from 'react-router-dom'
import './page.css'

function NotFoundPage() {
	return (
		<div className='not-found-contianer'>
			<Link to={'/'}>
				<button className='back-btn'>Go Home</button>
			</Link>
		</div>
	)
}

export default NotFoundPage
