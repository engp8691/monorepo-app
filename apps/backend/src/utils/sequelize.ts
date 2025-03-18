import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'employee',
  username: process.env.DB_USER || 'cradl',
  password: process.env.DB_PASS || 'cradl',
  logging: false, // Set to true for debugging SQL queries
})

export default sequelize
