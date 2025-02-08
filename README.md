# TODO API
A simple TODO CRUD API using Express.js and Turso

## Setup

Install dependencies
```
npm install
```

Create `.env` file and add your Turso URL and Token
```
DATABASE_URL={URL HERE}
DATABASE_AUTH_TOKEN={TOKEN HERE}
```

Serve locally
```
npm run dev
```

## Usage

### Create a new todo item
```
POST http://localhost:9000/posts
```

Body:

```
{
  "title": "Create test cases",
  "description": "Make a copy of the test plan document and fill with test cases"
}
```

### Retrieve all todo items
```
GET http://localhost:9000/posts
```

### Retrieve specific todo item
```
GET http://localhost:9000/posts/{ID HERE}
```

### Update an existing todo item
```
PUT http://localhost:9000/posts/{ID HERE}
```

Body:

```
{
  "title": "Modified todo item",
  "description": "Change the optional description"
}
```

### Delete a specific todo item
```
DELETE http://localhost:9000/posts/{ID HERE}
```
