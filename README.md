<div align="center">
<h1>Mobile Store API</h1>
<p>API is written in TypeScript and Nest.js</p>
</div>

Before launching, you need to create a configuration file `.env` in the root of the project, for example:
```env
PORT=80
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store-db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123
```
After that, run these commands:
```bash
docker-compose build
docker-compose up
```
Make sure that dokker and docker-compose are installed on your server