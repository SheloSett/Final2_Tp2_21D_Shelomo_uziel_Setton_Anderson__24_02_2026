import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const crearCSV = async (data) => {
    const rutaArchivo = join(__dirname, '../../albums.csv');
    await writeFile(rutaArchivo, data, 'utf-8');
    return rutaArchivo;
}
