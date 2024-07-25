import { Home } from '../views/home/home';
import { NotFound } from '../views/not-found/not-found';


export const routes = {
  public: [
    { path: '/not-found', page: NotFound },
    { path: '/home', page: Home }
  ],
};