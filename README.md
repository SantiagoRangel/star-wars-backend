# Star Wars Planets API

This API is based on the https://swapi.dev/ api.

There is a deployed version on this url: [https://star-wars-backend-omega.vercel.app/](https://star-wars-backend-omega.vercel.app/)

It handles the following api routes:

```bash
GET /health
GET /api/planets
GET /api/planets:id
POST /api/planets
UPDATE /api/planets
DELETE /api/planets/:id
```

## Installation

Please follow the instructions to run the project locally after cloning

1. Run the command

```bash
npm install
```

2. Setup the database: (I used supabase in this case). https://supabase.com/partners/integrations/prisma
3. Make sure you get the correct connection strings and store them in your .env file in root directory. You can use the connection string I will provide privately to connect to the db I already deployed.

4. If you are deploying the project for the first time, run the seed.ts script in /src/scripts/seed.ts to populate the db using data from de swapi api.

5. Run the command

```bash
npm run start
```
