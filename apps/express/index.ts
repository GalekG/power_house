import * as express from 'express';
import './dotenv';

import { requestLoggerMiddleware } from '../../src/shared/infra/express/middlewares/requestLogger.middleware';
import { PORT } from './config/consts';
import { usersRouter } from './users';

const app = express();

app.use(express.json());
app.use(requestLoggerMiddleware);

app.use(usersRouter);

app.get('/', (_req, res) => {
  res.send('PowerHouseAPI');
});

app.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`);
});
