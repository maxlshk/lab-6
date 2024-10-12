import { Application } from 'express';
import userRouter from './api/user.route';
import weatherRouter from './api/weather.route';

class AppRouter {
  constructor(private app: Application) {}

  init(): void {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/user', userRouter);
    this.app.use('/api/weather', weatherRouter);
  }
}

export default AppRouter;
