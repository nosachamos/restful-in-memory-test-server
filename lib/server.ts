import app from './app';
import * as https from 'https';
import * as fs from 'fs';
const PORT = 5000;

const httpsOptions = {
  key: fs.readFileSync('./config/localhost+2-key.pem'),
  cert: fs.readFileSync('./config/localhost+2.pem'),
  passphrase: 'test'
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
