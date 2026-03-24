import { useState } from 'react'
import './page.css'

function ProfilePage() {
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState({ type: '', text: '' })

	const [product, setProduct] = useState({
		sku: '',
		name: '',
		brand: '',
		category: '',
		gender: 'Unisex',
		price: '',
		discount_price: '',
		currency: 'UZS',
		sizes: [{ eu: 40, stock: 10 }],
		colors: [''],
		images: [''],
		materials: '',
		description: '',
		full_description: '',
		video_url: '',
		stock_quantity: 0,
		status: true,
		weight: '',
		rating: 0.0,
		reviews_count: 0
	})

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setProduct(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}))
	}

	// === Dynamic List Handlers ===

	// Sizes
	const handleSizeChange = (index, field, value) => {
		const newSizes = [...product.sizes]
		newSizes[index][field] = field === 'stock' || field === 'eu' ? Number(value) : value
		setProduct(prev => ({ ...prev, sizes: newSizes }))
	}
	const addSize = () => setProduct(prev => ({ ...prev, sizes: [...prev.sizes, { eu: 0, stock: 0 }] }))
	const removeSize = (index) => setProduct(prev => ({ ...prev, sizes: prev.sizes.filter((_, i) => i !== index) }))

	// Colors
	const handleColorChange = (index, value) => {
		const newColors = [...product.colors]
		newColors[index] = value
		setProduct(prev => ({ ...prev, colors: newColors }))
	}
	const addColor = () => setProduct(prev => ({ ...prev, colors: [...prev.colors, ''] }))
	const removeColor = (index) => setProduct(prev => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }))

	// Images
	const handleImageChange = (index, value) => {
		const newImages = [...product.images]
		newImages[index] = value
		setProduct(prev => ({ ...prev, images: newImages }))
	}
	const addImage = () => setProduct(prev => ({ ...prev, images: [...prev.images, ''] }))
	const removeImage = (index) => setProduct(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		setMessage({ type: '', text: '' })

		// Prepare data for API
		const payload = {
			...product,
			price: Number(product.price),
			discount_price: product.discount_price ? Number(product.discount_price) : null,
			weight: product.weight ? Number(product.weight) : null,
			stock_quantity: Number(product.stock_quantity),
			// Filtering empty strings from arrays
			colors: product.colors.filter(c => c.trim() !== ''),
			images: product.images.filter(img => img.trim() !== ''),
			sizes: product.sizes.filter(s => s.eu > 0)
		}

		try {
			const response = await fetch('https://e-commorce-1.onrender.com/api/products', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			})

			if (response.ok) {
				setMessage({ type: 'success', text: 'Mahsulot muvaffaqiyatli qo\'shildi! 🎉' })
				// Reset form if needed
				// setProduct({...initialState})
			} else {
				const errorData = await response.json()
				setMessage({ type: 'error', text: `Xatolik: ${errorData.message || 'Serverda xatolik yuz berdi'}` })
			}
		} catch (error) {
			setMessage({ type: error, text: 'Internet bilan bog\'liq xatolik yuz berdi.' })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='profile'>
			<h2>✨ Yangi Mahsulot Qo'shish</h2>

			{message.text && (
				<div className={`message-alert ${message.type}`}>
					{message.text}
				</div>
			)}

			<form onSubmit={handleSubmit} className='sneakersForm'>
				{/* === ASOSIY MA'LUMOTLAR === */}
				<fieldset className='form-section'>
					<legend>📦 Asosiy ma'lumotlar</legend>

					<div className='form-grid'>
						<div className='form-row'>
							<label htmlFor='name'>Mahsulot nomi *</label>
							<input
								id='name'
								name='name'
								type='text'
								required
								value={product.name}
								onChange={handleChange}
								placeholder='Nike Air Jordan 1'
							/>
						</div>

						<div className='form-row'>
							<label htmlFor='sku'>SKU (Artikul) *</label>
							<input
								id='sku'
								name='sku'
								type='text'
								required
								value={product.sku}
								onChange={handleChange}
								placeholder='NK-AJ1-001'
							/>
						</div>

						<div className='form-row'>
							<label htmlFor='brand'>Brend *</label>
							<input
								id='brand'
								name='brand'
								type='text'
								required
								value={product.brand}
								onChange={handleChange}
								placeholder='Nike'
							/>
						</div>

						<div className='form-row'>
							<label htmlFor='category'>Kategoriya</label>
							<select
								id='category'
								name='category'
								value={product.category}
								onChange={handleChange}
							>
								<option value=''>Tanlang...</option>
								<option value='Running'>Running</option>
								<option value='Basketball'>Basketball</option>
								<option value='Lifestyle'>Lifestyle</option>
								<option value='Football'>Football</option>
								<option value='Kids'>Kids</option>
							</select>
						</div>

						<div className='form-row'>
							<label htmlFor='gender'>Jinsi</label>
							<select id='gender' name='gender' value={product.gender} onChange={handleChange}>
								<option value='Unisex'>Unisex</option>
								<option value='Men'>Erkaklar</option>
								<option value='Women'>Ayollar</option>
								<option value='Kids'>Bolalar</option>
							</select>
						</div>

						<div className='form-row'>
							<label htmlFor='stock_quantity'>Umumiy qoldiq (Stock)</label>
							<input
								id='stock_quantity'
								name='stock_quantity'
								type='number'
								value={product.stock_quantity}
								onChange={handleChange}
								min='0'
							/>
						</div>
					</div>
				</fieldset>

				{/* === NARX VA VALYUTA === */}
				<fieldset className='form-section'>
					<legend>💰 Narx va Moliyaviy</legend>
					<div className='form-grid three-cols'>
						<div className='form-row'>
							<label htmlFor='price'>Asl Narx *</label>
							<div className='input-with-label'>
								<input
									id='price'
									name='price'
									type='number'
									required
									value={product.price}
									onChange={handleChange}
									placeholder='1200000'
									min='0'
									step='0.01'
								/>
								<span className='input-suffix'>{product.currency}</span>
							</div>
						</div>

						<div className='form-row'>
							<label htmlFor='discount_price'>Chegirma Narxi</label>
							<div className='input-with-label'>
								<input
									id='discount_price'
									name='discount_price'
									type='number'
									value={product.discount_price}
									onChange={handleChange}
									placeholder='1050000'
									min='0'
									step='0.01'
								/>
								<span className='input-suffix'>{product.currency}</span>
							</div>
						</div>

						<div className='form-row'>
							<label htmlFor='currency'>Valyuta</label>
							<select id='currency' name='currency' value={product.currency} onChange={handleChange}>
								<option value='UZS'>UZS</option>
								<option value='USD'>USD</option>
								<option value='RUB'>RUB</option>
							</select>
						</div>
					</div>
				</fieldset>

				{/* === DYNAMIC FIELDS === */}
				<div className='form-columns'>
					{/* SIZES */}
					<fieldset className='form-section'>
						<legend>📏 O'lchamlar va Qoldiq</legend>
						<div className='dynamic-list'>
							{product.sizes.map((item, index) => (
								<div key={index} className='dynamic-row'>
									<input
										type='number'
										placeholder='EU Size (e.g. 42)'
										value={item.eu}
										onChange={(e) => handleSizeChange(index, 'eu', e.target.value)}
									/>
									<input
										type='number'
										placeholder='Stock'
										value={item.stock}
										onChange={(e) => handleSizeChange(index, 'stock', e.target.value)}
									/>
									<button type='button' className='btn-remove' onClick={() => removeSize(index)}>✕</button>
								</div>
							))}
							<button type='button' className='btn-add' onClick={addSize}>+ O'lcham qo'shish</button>
						</div>
					</fieldset>

					{/* COLORS */}
					<fieldset className='form-section'>
						<legend>🎨 Ranglar</legend>
						<div className='dynamic-list'>
							{product.colors.map((color, index) => (
								<div key={index} className='dynamic-row'>
									<input
										type='text'
										placeholder='Rang (e.g. Qora)'
										value={color}
										onChange={(e) => handleColorChange(index, e.target.value)}
									/>
									<button type='button' className='btn-remove' onClick={() => removeColor(index)}>✕</button>
								</div>
							))}
							<button type='button' className='btn-add' onClick={addColor}>+ Rang qo'shish</button>
						</div>
					</fieldset>
				</div>

				{/* IMAGES */}
				<fieldset className='form-section'>
					<legend>🖼️ Mahsulot Rasmlari (URL)</legend>
					<div className='dynamic-list'>
						{product.images.map((url, index) => (
							<div key={index} className='dynamic-row full-width'>
								<input
									type='url'
									placeholder='https://example.com/image.jpg'
									value={url}
									onChange={(e) => handleImageChange(index, e.target.value)}
								/>
								<button type='button' className='btn-remove' onClick={() => removeImage(index)}>✕</button>
								{url && <img src={url} alt='Preview' className='image-preview-mini' onError={(e) => e.target.style.display = 'none'} />}
							</div>
						))}
						<button type='button' className='btn-add' onClick={addImage}>+ Rasm qo'shish</button>
					</div>
				</fieldset>

				{/* === TAVSIF VA MATERIAL === */}
				<fieldset className='form-section'>
					<legend>📝 Batafsil Ma'lumot</legend>
					<div className='form-row'>
						<label htmlFor='materials'>Materiallar</label>
						<input
							id='materials'
							name='materials'
							type='text'
							value={product.materials}
							onChange={handleChange}
							placeholder='Charm, Rezina, Mesh'
						/>
					</div>
					<div className='form-row'>
						<label htmlFor='description'>Qisqa Tavsif *</label>
						<textarea
							id='description'
							name='description'
							required
							rows='2'
							value={product.description}
							onChange={handleChange}
							placeholder='Mahsulot haqida qisqacha...'
						/>
					</div>
					<div className='form-row'>
						<label htmlFor='full_description'>To'liq Tavsif</label>
						<textarea
							id='full_description'
							name='full_description'
							rows='4'
							value={product.full_description}
							onChange={handleChange}
								placeholder="Batafsil ma'lumot..."
						/>
					</div>
					<div className='form-grid'>
						<div className='form-row'>
							<label htmlFor='video_url'>Video URL (YouTube/MP4)</label>
							<input
								id='video_url'
								name='video_url'
								type='url'
								value={product.video_url}
								onChange={handleChange}
								placeholder='https://...'
							/>
						</div>
						<div className='form-row'>
							<label htmlFor='weight'>Og'irligi (kg)</label>
							<input
								id='weight'
								name='weight'
								type='number'
								value={product.weight}
								onChange={handleChange}
								step='0.01'
								placeholder='0.5'
							/>
						</div>
					</div>
					<div className='form-row checkbox-row'>
						<label htmlFor='status'>
							<input
								id='status'
								name='status'
								type='checkbox'
								checked={product.status}
								onChange={handleChange}
							/>
							Sotuvda faol
						</label>
					</div>
				</fieldset>

				{/* === TUGMALAR === */}
				<div className='form-actions'>
					<button type='submit' className='btn-submit' disabled={isLoading}>
						{isLoading ? 'Yuborilmoqda...' : '✅ Mahsulotni Saqlash'}
					</button>
					<button type='button' className='btn-reset' onClick={() => window.location.reload()}>
						🔄 Tozalash
					</button>
				</div>
			</form>
		</div>
	)
}

export default ProfilePage
