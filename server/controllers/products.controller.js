import pool from '../db/db.js'

export const getProducts = async (req, res) => {
	try {
		const products = await pool.query(`
				Select * from products
			`)
		res.status(200).send(products.rows)
	} catch (error) {
		res.status(500).json({ message: 'Interval Server Error' })
		console.log('Products not found:', error)
	}
}

export const createProducts = async (req, res) => {
	try {
		const {
			sku,
			name,
			brand,
			category,
			gender,
			price,
			discount_price,
			currency,
			sizes,
			colors,
			images,
			materials,
			description,
			status,
			weight,
		} = req.body

		const sizesJson = JSON.stringify(sizes)
		const colorsJson = JSON.stringify(colors)
		const imagesJson = JSON.stringify(images)

		const newProduct = await pool.query(
			`
			INSERT INTO products(sku, name, brand, category, gender, price, discount_price, currency,
    												sizes, colors, images, materials, description, status, weight)
			VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
			RETURNING *
			`,
			[
				sku,
				name,
				brand,
				category,
				gender,
				price,
				discount_price,
				currency,
				sizesJson,
				colorsJson,
				imagesJson,
				materials,
				description,
				status,
				weight,
			],
		)

		res.status(201).send(newProduct.rows[0])
	} catch (error) {
		res.status(500).json({ message: 'Interval Server Error' })
		console.log('Create method error:', error)
	}
}

export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params

		const deletedProduct = await pool.query(
			`
				DELETE from products
				where id = $1
				RETURNING *
			`,
			[id],
		)

		res
			.status(200)
			.json({ message: 'Deleted product', product: deletedProduct.rows[0] })
	} catch (error) {
		res.status(500).json({ message: 'Interval Server Error' })
		console.log('Delete method error:', error)
	}
}

export const updateProduct = async (req, res) => {
	try {
		const { id } = req.params
		const {
			sku,
			name,
			brand,
			category,
			gender,
			price,
			discount_price,
			currency,
			sizes,
			colors,
			images,
			materials,
			description,
			status,
			weight,
		} = req.body

		const sizesJson = JSON.stringify(sizes)
		const colorsJson = JSON.stringify(colors)
		const imagesJson = JSON.stringify(images)

		const updatedProduct = await pool.query(
			`
				UPDATE products
				SET sku = $1,
						 name = $2,
						 brand = $3,
						 category = $4,
						 gender = $5,
						 price = $6,
						 discount_price = $7,
						 currency = $8,
						 sizes = $9,
						 colors = $10,
						 images = $11,
						 materials = $12,
						 description = $13,
						 status = $14,
						 weight = $15
				where id = $16
				RETURNING *
			`,
			[
				sku,
				name,
				brand,
				category,
				gender,
				price,
				discount_price,
				currency,
				sizesJson,
				colorsJson,
				imagesJson,
				materials,
				description,
				status,
				weight,
				id,
			],
		)

		res.status(201).json({
			message: 'Successful Updated',
			updateProduct: updatedProduct.rows[0],
		})
	} catch (error) {
		res.status(500).json({ message: 'Interval Server Error' })
		console.log('Update method error:', error)
	}
}
