/* global process */
import 'dotenv/config'
import { Pool } from 'pg'

const pool = new Pool({
	connectionString: process.env.DB_URL,
	ssl: {
		rejectUnauthorized: false,
	},
})

pool.connect(() => {
	try {
		console.log('Data base ga ulandi')
	} catch (error) {
		console.log('Data base ga ulanishda xatolik:', error)
	}
})

export default pool
