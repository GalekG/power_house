import { Router } from 'express';
import { CreateOrUpdateUser } from './users/createOrUpdateUser';
import { Login } from './users/login';

const usersRouter = Router();

const basePath = '/users';

usersRouter.post(`${basePath}`, CreateOrUpdateUser);

usersRouter.post('/auth/login', Login);

export {
  usersRouter,
};
