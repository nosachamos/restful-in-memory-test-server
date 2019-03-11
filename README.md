# RESTful API Test Server

This is a simple API for making CRUD operations against a series of collections.

## Running

You can start the server with the following command:

`npm run dev`

This will start the server directly from the TypeScript source code (without visible transpilation) using ts-node. Also, a watch process will
observe file changes and restart the server automatically.

The server will start on port 5000.

You should see an output like so:

```
$ npm run dev

> crm@1.0.0 dev C:\Work\ngrx-connect\server
> nodemon -x node --inspect=5500 -r ts-node/register ./lib/server.ts

[nodemon] 1.18.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node --inspect=5500 -r ts-node/register ./lib/server.ts`
Debugger listening on ws://127.0.0.1:5500/7b245250-b8a8-4d2b-bf11-e1e903cbb3a6
For help, see: https://nodejs.org/en/docs/inspector
Express server listening on port 5000
```

### Debugging

You may connect to the server node process using an IDE such as WebStorm to setup breaking points, etc normally. To debug, use port 5500 when
connecting to the node process.

### Generating HTTPs Certificates

All URLs are available under HTTPS only, at: *https://localhost:5000*

The key and cert in the config folder is for testing purpose only. You should generate your own.

#### Generating SSL key and certificate

If you use Windows, this is by far the easiest method to generate the correct key and certificate:

1 - Install mkcert from here:

https://github.com/FiloSottile/mkcert/releases

or use the provided one in the "cert" folder.

2 - If you chose to download a new binary, rename it to just "mkcert.exe" for simplicity.

3 - Add mkcert.exe to your PATH env variable.

4 - Run the following command to install a trusted CA:

`mkcert -install`

Accept the prompt to install the local CA.

5 - Navigate to the config folder of the server project, then run:

`mkcert localhost 127.0.0.1 ::1`

This will create the key and certificate you need.

6 - Update the `server.ts` file so it points to the correct key and certificate file names.

Done! You can now start the server and navigate to a localhost address using HTTPS without any issues.


## Settings

### Initial data

In order to have useful test endpoints it is often useful to prime the server with an initial set of mock data, and then allow that data to be manipulated as the tests run. This initial data set also defines which collections will be available as endpoints. After it has been set the server will only be able to manipulate those collections, which means requests to other collections will result in `404 - Not Found` responses.

To do that, send your initial data set to:

`POST https://localhost:5000/settings/db`


#### Example

For example, suppose we want to test a Todo app which manages Todos and Todo Lists. In this app, you can have todos that belong to a todo list, as well as standalone Todos that are not linked to any Todo List. To have this structure setup, you would send this data to the server:

```
{
  "todos": [
    {
      "id": 1,
      "name": "Call Johnny",
      "description": "Need to bound a couple of ideas."
    },
    {
      "id": 2,
      "name": "Send package",
      "description": "Must have return package sent today on USPS."
    }
  ],
  "todoLists": [
    {
      "id": 3,
      "name": "Software tasks",
      "todos": [
        {
          "id": 4,
          "name": "Implement feature",
          "description": "Write some nice codez and create PR."
        },
        {
          "id": 5,
          "name": "Prepare slides for conference",
          "description": "Write the slides and have them reviewed."
        }
      ]
    }
  ]
}
```

Once the server has received this data, the following endpoints are available to you:

*Manage the standalone Todos:*

- `GET https://localhost:5000/todos` - lists the Todos.
- `POST https://localhost:5000/todos` - creates the a new Todo.
- `DELETE https://localhost:5000/todos` - delete all Todos.
- `GET https://localhost:5000/todos/:todoId` - gets the given Todo.
- `PUT https://localhost:5000/todos/:todoId` - updates the given Todo.
- `DELETE https://localhost:5000/todos/:todoId` - deletes the given Todo.

*Manage the Todo Lists:*

- `GET https://localhost:5000/todoLists` - lists the Todos Lists.
- `POST https://localhost:5000/todoLists` - creates the a new Todo List.
- `DELETE https://localhost:5000/todoLists` - delete all Todos Lists.
- `GET https://localhost:5000/todoLists/:todoListId` - gets the given Todo List.
- `PUT https://localhost:5000/todoLists/:todoListId` - updates the given Todo List.
- `DELETE https://localhost:5000/todoLists/:todoListId` - deletes the given Todo List.

*Manage the Todos that belong to a given Todo List:*

- `GET https://localhost:5000/todoLists/:todoListId/todos` - gets the Todos for a given Todo List.
- `POST https://localhost:5000/todoLists/:todoListId/todos` - create all the Todos for a given Todo List.
- `DELETE https://localhost:5000/todoLists/:todoListId/todos` - deletes all the Todos for a given Todo List.
- `GET https://localhost:5000/todoLists/:todoListId/todos/:todoId` - gets a Todo that belongs to a given Todo List.
- `PUT https://localhost:5000/todoLists/:todoListId/todos/:todoId` - updates a Todo that belongs to a given Todo List.
- `DELETE https://localhost:5000/todoLists/:todoListId/todos/:todoId` - deletes a Todo that belongs to a given Todo List.

Note that if you use globally unique ids for your objects, then you don't need to use the nested resource endpoints to manage Todos that belong to a given Todo List. In that case using the standalone endpoints will work just as well.




### Simulating failures

To set whether the server should respond with failures, submit a GET request to the following URL:

`GET https://localhost:5000/settings/requestsShouldFail/true`

To disable failures, submit a GET request to:

`GET https://localhost:5000/settings/requestsShouldFail/false`

### Simulating server delay

You can simulate a slow server response by submitting a GET request to the following URL:

`https://localhost:5000/settings/setDelay/:delay`

For example, to simulate a 2 seconds delay on all requests, use:

`https://localhost:5000/settings/setDelay/2000`

To disable the artificial delay, set the delay to zero:

`https://localhost:5000/settings/setDelay/0`


## License

MIT

--------------

Made with ❤ and coffee

