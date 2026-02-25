# TP2 - API de Gestión de Inventario de Productos

**Autor:** Shelomo Uziel Setton
**Institución:** ORT Argentina
**Carrera:** Analista en sistemas

---

## Descripcion

API REST para la gestión de inventario de productos, construida con Node.js y Express. Permite realizar operaciones CRUD sobre productos almacenados en MongoDB Atlas, con autenticación por API Key para operaciones administrativas. También incluye un endpoint para consumir datos externos y exportarlos como CSV.

---

## Tecnologias

| Tecnología | Version | Uso |
|---|---|---|
| Node.js | >= 14.0.0 | Runtime |
| Express.js | 5.2.1 | Framework HTTP |
| MongoDB Atlas | — | Base de datos en la nube |
| Mongoose | 9.2.1 | ODM para MongoDB |
| Axios | 1.13.5 | Cliente HTTP para APIs externas |
| dotenv | 17.3.1 | Variables de entorno |
| Morgan | 1.10.1 | Logging de requests |
| Biome | 0.3.3 | Linter y formatter |

---

## Requisitos previos

- Node.js >= 14.0.0
- npm >= 6.0.0
- Cuenta en MongoDB Atlas (o MongoDB local)

---

## Instalacion

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd Shelomo_Uziel_Setton

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores
```


---

## Scripts disponibles

| Comando | Descripcion |
|---|---|
| `npm run dev` | Inicia el servidor en modo desarrollo con auto-reload (`--watch`) |
| `npm test` | Ejecuta Biome para formatear y lintear el código fuente |

---

## Endpoints de la API

Base URL: `http://127.0.0.1:3001/api/v1`

### Productos (rutas publicas)

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/productos` | Obtiene todos los productos |
| `GET` | `/productos/:id` | Obtiene un producto por ID |
| `POST` | `/productos` | Crea un nuevo producto |

### Productos (rutas admin — requieren API Key)

| Metodo | Ruta | Descripcion | Header requerido |
|---|---|---|---|
| `PUT` | `/productos/:id` | Actualiza el stock de un producto | `x-api-key: <API_KEY>` |
| `DELETE` | `/productos/:id` | Elimina un producto | `x-api-key: <API_KEY>` |

### CSV / Albums

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/albums/csv` | Descarga los primeros 15 albums de JSONPlaceholder como CSV |

---

## Autenticacion

Las rutas administrativas (`PUT` y `DELETE`) requieren el header:

```
x-api-key: GOGOGO
```

- Si el header no está presente → `401 Unauthorized`
- Si la clave es incorrecta → `403 Forbidden`

---

## Modelo de datos — Producto

```json
{
  "producto": "Nombre del producto",
  "stockAmount": 100,
  "fechaIngreso": "2026-02-24T00:00:00.000Z"
}
```

| Campo | Tipo | Requerido | Descripcion |
|---|---|---|---|
| `producto` | String | Si | Nombre del producto (sin espacios al inicio/fin) |
| `stockAmount` | Number | Si | Cantidad en stock (>= 0) |
| `fechaIngreso` | Date | No | Fecha de ingreso (por defecto: fecha actual) |

---

## Estructura del proyecto

```
Shelomo_Uziel_Setton/
├── app.js                          # Punto de entrada de la aplicacion
├── package.json
├── biome.json                      # Configuracion del linter/formatter
├── .env.example                    # Plantilla de variables de entorno
└── src/
    ├── server.js                   # Configuracion del servidor Express
    ├── config/
    │   └── config.js               # Carga de variables de entorno
    ├── database/
    │   └── mongo.cnx.js            # Conexion a MongoDB/Mongoose
    ├── models/
    │   ├── Producto.js             # Schema Mongoose del producto
    │   └── ProductoDTO.js          # Data Transfer Object
    ├── controller/
    │   ├── productController.js    # Controlador de productos
    │   └── csvController.js        # Controlador del CSV
    ├── router/
    │   ├── product.router.js       # Rutas publicas de productos
    │   ├── product.admin.router.js # Rutas admin de productos
    │   └── csvRouter.js            # Rutas del CSV
    ├── repository/
    │   └── productoRepositoryMongo.js  # Acceso a datos (MongoDB)
    ├── use-cases/
    │   └── product.useCases.js     # Logica de negocio
    ├── services/
    │   └── CSVService.js           # Servicio de CSV externo
    ├── middlewares/
    │   └── auth.Middleware.js      # Middleware de autenticacion por API Key
    ├── utils/
    │   ├── validateProductData.js  # Validacion de datos del producto
    │   ├── crearCSV.js             # Creacion del archivo CSV
    │   ├── descargaCSV.js          # Descarga de datos externos
    │   └── filtrar.js              # Filtro de datos (primeros 15)
    └── test/
        ├── productos.endpoints.http    # Tests HTTP de productos
        └── albums15.test.http          # Tests HTTP del CSV
```

---

## Arquitectura

La aplicacion sigue una arquitectura en capas:

```
Request
   └── Router
         └── Controller
               └── Use Cases (logica de negocio)
                     └── Repository (acceso a MongoDB)
```

Con las siguientes capas transversales:

- **Middleware** — Autenticacion por API Key
- **Services** — Operaciones CSV con APIs externas
- **Utils** — Validacion, filtrado y creacion de archivos
- **Models/DTOs** — Representacion y transferencia de datos

---

## Ejemplos de uso

### Crear un producto

```http
POST /api/v1/productos
Content-Type: application/json

{
  "producto": "Laptop",
  "stockAmount": 50
}
```

### Actualizar stock (admin)

```http
PUT /api/v1/productos/64abc123def456
Content-Type: application/json
x-api-key: GOGOGO

{
  "stockAmount": 75
}
```

### Eliminar un producto (admin)

```http
DELETE /api/v1/productos/64abc123def456
x-api-key: GOGOGO
```

### Descargar albums como CSV

```http
GET /api/v1/albums/csv
```

---


