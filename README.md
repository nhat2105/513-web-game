# 513-web-game

# Note

In order to run this project, you must have PSQL (Postgres) support.

Change DB_PASSWORD and POSTGRES_PASSWORD to your own set up password in .env of backend

# Team members (Group 34):
    Kevin Xie (30148341)
    Siqing Liu (30127864)
    Zirui Wang (30119554)
    Hong Truong (30156301)
    Dhanraj Dubal (30173234)
    Aditi Yadav (30143652)

# Starting client

## First time initialization
`cd client`
`npm install .`

# Server initalization

`cd server`
`npm install .`

# Starting server / client `cd server` or `cd client` without deployment

In .env, comment out the DB_HOST=db, while uncomment out the DB_HOST=localhost


`npm start`

# Docker build

In .env, uncomment out the DB_HOST=db, while comment out the DB_HOST=localhost

While having the Docker Desktop open, you can just run: `docker compose up` 
from the repo without entering any folder