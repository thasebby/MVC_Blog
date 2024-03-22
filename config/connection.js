import { Sequelize } from 'sequelize'
import 'dotenv/config'

let newSequelize

if (process.env.JAWSDB_URL) {
  newSequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
  newSequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3001
  }
)
}

export { Sequelize }