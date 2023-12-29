## About

The api has focus to collect events and save on database.


## Instructions

- Clone
- Create **.env** file base **.env.example**
- Execute command **npm i** to install all packages the project needs
- Execute command **docker-compose up -d** to run redis and mongodb containers
- Execute command **npm run start:dev** to start api
- Execute command **npm run job:dev** to start job responsable to process session and save database.

## Observation

```
API_KEY=<uuid_value_you_want>
DB_URL=<database_url> // For example: "mongodb://127.0.0.1:27017/tracker_session"
```