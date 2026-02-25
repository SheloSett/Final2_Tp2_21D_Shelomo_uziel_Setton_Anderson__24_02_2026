import { CSVService } from "../services/CSVService.js";
import { crearCSV } from "../utils/crearCSV.js";



export const csvController = {
    getCSV: async (req, res) => {
        try {
            const albums = await CSVService.descargarCSV();

            const encabezado = Object.keys(albums[0]).join(',');
            const filas = albums.map(album => Object.values(album).join(','));
            const csv = [encabezado, ...filas].join('\n');

            await crearCSV(csv);

            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        } catch (error) {
                res.status(500).json({
                message: 'Error al descargar el CSV',
                error: error.message,
                ok:false
            });
        }
    }
}