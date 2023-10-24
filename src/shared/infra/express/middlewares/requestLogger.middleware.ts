import { Response } from 'express';

import { AuthRequest } from '../requests/auth.request';

function requestLoggerMiddleware(req: AuthRequest, res: Response, next) {
  const startTime = Date.now();

  res.on('finish', () => {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    const { protocol, originalUrl } = req;
    const host = req.get('host');

    console.log(
      `${req.method} ${protocol}://${host + originalUrl} - Estado: ${res.statusCode} - Tiempo de ejecución: ${elapsedTime}ms`,
    );
  });

  next();
}

export {
  requestLoggerMiddleware,
};
