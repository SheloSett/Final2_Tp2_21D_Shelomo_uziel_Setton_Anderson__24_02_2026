import config from "../config/config.js"
import { descargarContenidoCSV } from "../utils/descargaCSV.js";
import { filtrar } from "../utils/filtrar.js";


export const CSVService = {
    descargarCSV: async () => {
        const contenidoCSV = await descargarContenidoCSV(config.PATH_CSV);
        const filtrados15 = await filtrar(contenidoCSV)
        console.log(filtrados15)
        return filtrados15
    }
}