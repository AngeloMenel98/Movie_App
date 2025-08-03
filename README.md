# Movie App
MVP for an interview job.
## Prerequisites
- Docker (for the DB)
- Node.js (v18+)
- npm
## Setup
### 1. Base de datos con PostgreSQL
Execute the next command to create a Docker container of PostrgeSQL:
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
To stop the container, execute:
```bash
docker stop movie_db
```

If it is already created, execute:
```bash
docker start movie_db
```

**Note:** To start de backend be sure that the container is running.
### 2. Configure the backend
Go to the backend directory:
```bash
cd backend
```
Install the dependencies:
```bash
npm install
```
### 3. Configure the frontend
Go to the frontend directory:
```bash
cd frontend
```
Install the dependencies:
```bash
npm install
```
## Execute the App
### Backend
From the `backend` directory:
```bash
npm run start
```
### Frontend
From the `frontend` directory:
```bash
npm run dev
```
## Populate the Database (Seeding)
Use the `seed.http` archive (located in the `backend` directory) to send HTTP solitudes that will populate the database with the minimum information. 

**Note:** Instal in VSCode the extension REST Client to run the request.


### Steps:
1. Open`seed.http` in VSCode.
2. Click in `Send Request`that appear in every HTTP request.
3. Execute each one to create users and movies.

## Project structure
- `backend/`: Contains the API REST build with Nest.js.
- `frontend/`: Contains the React app build with Next.js.
