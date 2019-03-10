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


## Commands

### Simulating failures

To set whether the server should respond with failures, submit a GET request to the following URL:

https://localhost:5000/commands/requestsShouldFail/true

To disable failures, submit a GET request to:

https://localhost:5000/commands/requestsShouldFail/false

### Simulating server delay

You can simulate a slow server response by submitting a GET request to the following URL:

https://localhost:5000/commands/setDelay/:delay

For example, to simulate a 2 seconds delay on all requests, use:

https://localhost:5000/commands/setDelay/2000

To disable the artificial delay, set the delay to zero:

https://localhost:5000/commands/setDelay/0


## License

MIT

