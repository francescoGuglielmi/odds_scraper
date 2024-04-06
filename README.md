# Odds Scraper

This application aims to scrap the odds of the upcoming games of the Premier League from Betfred using Puppeteer + Node and store the results in a PostgreSQL database hosted on Neon.tech using Knex.

<img width="1200" src="https://github.com/francescoGuglielmi/odds_scraper/blob/main/images/page.jpg"> <br/>

<img width="1200" src="https://github.com/francescoGuglielmi/odds_scraper/blob/main/images/NeonDB-matches-table.png"> <br/>

## Setup
1. Make sure you have nvm and node installed, ideally the LTS version. Run this command to verify the installation.

```
node -v 
```
2. You need to create a Postgres database for this project to work. Make sure you get the connect string or the relevant auth detail.  

3. Clone the project

4. run npm install to install all the dependencies locally.

5. Create a .env file. You will need this to set up your CONNECTION_STRING to the database.

The database is set up using directly the connection string rather than the single params.

If you don't have an explicit connection string you can make one in the format:

```
postgres://username:password@host:port/database
```

## Migrations

I made two scripts to run migration up 
```
npm run migration
```

and migration down
```
npm run rollback
```

I suggest migrating up before running start command so to prepare the table to receive data.

## Start

```
npm run start
```

As part of the output you will also see a log in the console of all the db entries retrieved and whether a new entry will not be added to the database (usually because that entry already exists there).

