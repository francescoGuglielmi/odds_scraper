# Odds Scraper

This application scraps the odds for the upcoming games of the Premier League from Betfred using Puppeteer + Node and store the results in a PostgreSQL database hosted on Neon.tech using Knex.

<img width="1200" src="https://github.com/francescoGuglielmi/odds_scraper/blob/main/images/page.jpg"> <br/>

<img width="1200" src="https://github.com/francescoGuglielmi/odds_scraper/blob/main/images/NeonDB-matches-table.png"> <br/>

## Why Knex
Knex is a fantastic ORM for SQL queries in a Node.js environment. Writing queries with Knex allows you to:

- Mitigate security risks such as SQL injections.
- Keep your code cleaner and write queries in a more readable way.
- Switch between different SQL databases with the minimum amount of re-configuration involved.

## Setup
1. Make sure you have nvm and node installed, ideally the LTS version. Run this command to verify the installation.

```
node -v 
```
2. You need to create a Postgres database for this project to work. You can create one for free on Neon.tech.

3. Clone the project

4. run npm install to install all the dependencies locally.

5. Create a .env file. You will need this to set up your CONNECTION_STRING variable to connect to the database.

The database is set up using directly the connection string rather than the single params. After your db creation, copy your connection string to the environment variable in your .env file.
Make sure that you click on the "eye" in picture before you copy so that the secret password is part of the string, else you won't be able to connect.

<img width="1000" src="https://github.com/francescoGuglielmi/odds_scraper/blob/main/images/Connection_String.png"> <br/>

If you don't have an explicit connection string you can make one in the format:

```
postgres://username:password@host:port/database
```

## Migrations

I made two scripts to run migration up:
```
npm run migrate
```

and migration down:
```
npm run rollback
```

I suggest to run the first one before running the start command so to prepare the table in your db to receive data.

## Start

```
npm run start
```

As part of the output you will also see a log in the console of all the db entries retrieved and whether a new entry will not be added to the database (usually because that entry already exists there). This is to verify that the process was successful.

