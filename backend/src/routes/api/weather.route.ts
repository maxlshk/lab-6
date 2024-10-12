import { Router } from 'express';
import { authenticateJwt } from '@/middleware/auth.middleware';
import * as weatherController from '@/controllers/weather.controller';

const weatherRouter: Router = Router();

weatherRouter.use(authenticateJwt);
weatherRouter.get('/', authenticateJwt, weatherController.getWeather);

export default weatherRouter;
