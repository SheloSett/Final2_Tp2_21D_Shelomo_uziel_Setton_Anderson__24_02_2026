import axios from "axios"


export const descargarContenidoCSV = async(url) => {
    const contenido = await axios.get(url);
    return contenido.data;
}