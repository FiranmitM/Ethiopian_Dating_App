require('dotenv').config()

const PORT = process.env.PORT

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const GOOGLE_API = process.env.GOOGLE_API

module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  PORT,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  GOOGLE_API
}
