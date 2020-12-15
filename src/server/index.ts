import express, { Express } from 'express';
import apiRouter from './routes';
import { SERVER_PORT, BASE_MEDIA_DIR } from '../config';
import lister from './lister';

const app: Express = express();

app.use(express.static('public'));
app.use(apiRouter);
lister.listMediaFilesFromDir(BASE_MEDIA_DIR);
app.listen(SERVER_PORT, () =>
  console.log(`Server listening on port: ${SERVER_PORT}`)
);
