# Movie App
Aplicación web para visualizar peliculas.
## Prerequisites
- Docker (para la base de datos)
- Node.js (v18 o superior)
- npm
## Setup
### 1. Base de datos con PostgreSQL
Ejecuta el siguiente comando para crear un contenedor de Docker con PostgreSQL:
```bash
docker run -d \
  --name movie_db \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=movie_app \
  -e POSTGRES_DB=movie_app \
  -p 54321:5432 \
  -v pgdata:/var/lib/postgresql/data \
  postgres:15.2-alpine3.17
```
Para parar el contenedor, ejecutar:
```bash
docker stop movie_db
```

Si ya esta creado, ejecutar:
```bash
docker start movie_db
```

**Nota:** Asegúrate de tener Docker instalado y en ejecución.
### 2. Configurar el backend
Navega al directorio del backend:
```bash
cd backend
```
Instala las dependencias:
```bash
npm install
```
### 3. Configurar el frontend
Navega al directorio del frontend:
```bash
cd frontend
```
Instala las dependencias:
```bash
npm install
```
## Ejecutar la aplicación
### Backend
Desde el directorio `backend`:
```bash
npm run start
```
### Frontend
Desde el directorio `frontend`:
```bash
npm run dev
```
## Poblar la base de datos (Seeding)
Usa el archivo `seed.http` (ubicado en el directorio `backend`) para enviar solicitudes HTTP que poblarán la base de datos. 

**Nota:** Instala en VSCode la extension de REST Client para correr las request.


### Pasos:
1. Abre el archivo `seed.http` en VSCode.
2. Haz clic en el botón `Send Request` que aparece sobre cada solicitud HTTP en el archivo.
3. Ejecuta las solicitudes en orden para crear usuarios, películas, etc.
## Estructura del proyecto
- `backend/`: Contiene el código del servidor (API REST).
- `frontend/`: Contiene la aplicación React en Next.js.
