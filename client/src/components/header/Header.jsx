import { Link } from 'react-router-dom'
import './header.css'

function Header() {
	return (
		<>
			<div className='header'>
				<Link to={'/'}>
					<img src='./image-header.png' alt='' />
				</Link>

				<ul className='navbar'>
					<Link to={'/'}>
						<li className='link'>Home</li>
					</Link>
					<Link to={'/all'}>
						<li className='link'>All</li>
					</Link>
					<Link to={'/profile'}>
						<li className='link'>Profile</li>
					</Link>
				</ul>
			</div>
		</>
	)
}

export default Header
