
# Custom backend template

Backend template ready with express typescript, http/https, socket.io, cronjob.


## Authors

- [@PlusIvan](https://www.github.com/PlusIvan)


## Installation / Setup

```bash
  npm install
  cd /src/private
  cp .env-template .env
```
 Last thing is to check for file **./src/.express.ts** & modify array of **"Access-Control-Allow-Origin"** according to your frontend needs.

## Used packages

- "@types/cron": "^1.7.3",
- "@types/express": "^4.17.13",
- "@types/jsonwebtoken": "^8.5.8",
- "@types/uuid": "^8.3.4",
- "cron": "^2.0.0",
- "dotenv": "^16.0.0",
- "express": "^4.18.1",
- "helmet": "^5.0.2",
- "jsonwebtoken": "^8.5.1",
- "nodemon": "^2.0.16",
- "socket.io": "^4.5.0",
- "typescript": "^4.6.4",
- "uuid": "^8.3.2"
