# Report Scheduler
#### This project is built with node + ExpressJs + PostgreSql

This is a service that processes user-generated reports.

### Requirement
---
    Node.js 20.17.0
    npm 10.8.2

### How to install
---

1. install server
 - Create env file
 - Set server keys on .env
 > `cp .env.example .env` 
 > `npm install`

2. start Redis server
> run redis-server.exe

3. setup database
> `npm run db:setup`

3. run web server
> `npm run dev` on local environment.
Server will run on http://localhost:3001
---