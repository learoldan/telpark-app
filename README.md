# Telpark App

Aplicación full-stack para la gestión de organizaciones y puntos de carga.

- **Backend**: NestJS + TypeORM + PostgreSQL
- **Frontend**: Next.js

---

## Requisitos previos

- **Windows**: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Linux/macOS**: Docker Engine + Docker Compose plugin

---

## Opción A — Clonar el repositorio

```bash
git clone git@github.com:learoldan/telpark-app.git
cd telpark-app
docker compose up --build
```

---

## Opción B — Descargar los archivos comprimidos

1. Descargá `backend.zip` y `frontend.zip`.
2. Creá una carpeta vacía, por ejemplo `telpark-app/`.
3. Descomprimí `backend.zip` dentro de esa carpeta.  
   Debe quedar la siguiente estructura:
   ```
   telpark-app/
   ├── docker-compose.yml
   └── backend/
   ```
4. Descomprimí `frontend.zip` dentro de la misma carpeta.  
   La estructura final debe ser:
   ```
   telpark-app/
   ├── docker-compose.yml
   ├── backend/
   └── frontend/
   ```
5. Abrí una terminal en `telpark-app/` y ejecutá:
   ```bash
   docker compose up --build
   ```

---

## Acceder a la aplicación

| Servicio   | URL                          |
|------------|------------------------------|
| Frontend   | http://localhost:3000        |
| Backend    | http://localhost:5000        |
| Swagger    | http://localhost:5000/api    |

---

## Detener la aplicación

```bash
docker compose down
```

Para eliminar también los datos de la base de datos:

```bash
docker compose down -v
```
