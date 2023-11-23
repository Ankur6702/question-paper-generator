# question-paper-generator

## Tech Stack
- [NodeJS](https://nodejs.org/en)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Rest API](https://developers.google.com/fit/rest/v1/get-started)
- [Swagger](https://swagger.io/)

## Documentation

[API Documentation](https://question-paper-generator.azurewebsites.net/docs/)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `MONGO_URI` is used to connect the project to a MongoDB database.

## Installation & Basic Instructions

Install the project with yarn/npm.

Clone the repository

```bash
  git clone https://github.com/Ankur6702/question-paper-generator.git
```

Enter in cloned the directory

```bash
  cd question-paper-generator
```

Install Node modules in the cloned folder

```bash
  npm install
```

Start the server in production mode with

```bash
  npm start
```

Start the server in development mode with

```bash
  npm run dev
```

Populate the database with the sample data provided. You can do so by using the /question/createMany API. Just copy and paste all the data from the sampleData.json file in the body of the request. You can also use the /question/create API to add a single question. 

Alternatively, you can directly it the API using the deployed version of this project using the production url in [swagger API documentation](https://question-paper-generator.azurewebsites.net/docs/).