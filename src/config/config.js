import dotenv from 'dotenv'

dotenv.config()

const {

    MONGO_URI,
    SERVER_PORT,
    SERVER_HOST,
    PATH_CSV

} = process.env

const config = {
    MONGO_URI,
    SERVER_PORT,
    SERVER_HOST,
    PATH_CSV
}

export default config;