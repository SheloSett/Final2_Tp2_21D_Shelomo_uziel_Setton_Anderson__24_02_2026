import config from './src/config/config.js'
import mongooseConnectionInstance from './src/database/mongo.cnx.js'
import server from './src/server.js'


const PORT = config.SERVER_PORT
const HOST = config.SERVER_HOST

const runServer = async () => {
    try {
        await mongooseConnectionInstance.connect()
        console.log(`Conexion establecida con MongoAtlas`)
        
        server.listen(
            PORT,
            HOST,
            console.log(`Server is running at http://${HOST}:${PORT}`)    
        )
    
    }
    catch (error){
        console.log(`Error en la Conexion con MongoAtlas`, error.message)
    }

}

runServer();