# Trip Advisor API

This is a basic REST API that simulates part of the Trip Advisor application. It is implemented with Typescript, Express.js and MySQL, authentication handled with JSON Web Tokens.

## How to run

### Prerequesites

Node and NPM/Yarn installed on the machine, plus a MySQL instance available.

### Install dependencies

From project directory:
```bash
# Install dependencies
npm install
# set execution permission on scripts
chmod -R u+x bin
# install symlinks for project scripts
npm link
# Compile
npm run build
```
### Configure database

Set database configuration in the file `secret/db.json` without modifying the `database` field. Make sure your MySQL instance does not have a database named *trip_advisor*.

Run the following:
```bash
# Create schema
run-sql sql/schema.sql
# Insert some test data
run-sql sql/test_data.sql
# Log database data to see if it worked (don't use in production obviously)
log-db
```

If you get this error:
`Client does not support authentication protocol requested by server`
Try running this SQL throughout another client replacing the strings with your database credentials:
```sql
ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

### Start and test

Start the server with:
```bash
npm start
```
and test the Postman collection by running:
```bash
npm run test-api
```

You should get a bunch of 200 status codes :)

In order to rerun the test you should revert the db status to only have the test data by running:
```bash
run-sql sql/delete.sql && run-sql sql/test_data.sql
```
