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

6. Set up database connection:

The database is set up using directly the connection string rather than the single params. After your db creation, copy your connection string to the environment variable in your .env file.
Make sure that you click on the "eye" in picture before you copy so that the secret password is part of the string, else you won't be able to connect.

<img width="1000" src="https://github.com/francescoGuglielmi/odds_scraper/blob/main/images/Connection_String.png"> <br/>

If you don't have an explicit connection string you can make one in the format:

```
postgres://username:password@host:port/database
```

7. In the root of the project run:

```
npm run migrate
```

## Migrations

I created two scripts to run migrations. They allow to prepare (or reset) the database table.

up  ➡️ (CREATE TABLE macthes):
```
npm run migrate
```

down ➡️ (DROP TABLE matches):
```
npm run rollback
```

## Start

```
npm run start
```

As part of the output you will also see a log in the console of all the db entries retrieved and whether a new entry will not be added to the database (usually because that entry already exists there). This is to verify that the process was successful.

## Test environment setup

<img width="1200" src="https://github.com/francescoGuglielmi/odds_scraper/blob/main/images/test_results.png"> <br/>

In order to run the test suite, you need to have PostgreSQL installed on your local machine. If you have Homebrew you can do so by running:

```
brew install postgresql@15
```

otherwise check the instructions on the official website [here](https://www.postgresql.org/download/).

Once downloaded make sure you add it to PATH.

```
echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc
```

Now it's time to open the REPL that comes out of the box with PostgreSQL. Run:

```
psql -h 127.0.0.1
```

The name you see there is your username and you can set a password by running:

```
\password
```

You will need them in a moment.

Then create the test database by running this command in the REPL:

```sql
CREATE DATABASE "odds_scraper_test_db";
```

Brilliant! You have the database. Now to connect to the database add to your .env file the POSTGRES_USERNAME and POSTGRES_PASSWORD.

### Run the tests

```
npm run test
```