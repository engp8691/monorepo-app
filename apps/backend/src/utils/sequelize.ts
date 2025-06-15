import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // important for Render SSL
    },
    family: 4, // force IPv4
  },
  host:
    process.env.DB_HOST ||
    'dpg-d17dftqdbo4c73fqk2eg-a.ohio-postgres.render.com',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'cradl',
  username: process.env.DB_USER || 'cradl',
  password: process.env.DB_PASS || 'EGlOzWDdcNYywV25FboD7ldsjM9MCQ3Y',
  logging: false,
})

export default sequelize
