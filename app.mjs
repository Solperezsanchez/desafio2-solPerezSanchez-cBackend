import express from 'express';
import routes from './routes.mjs';

const app = express();
const port = 8080;

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});


