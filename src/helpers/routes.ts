import { DataView } from '../views/data-view/data-view';
import { Home } from '../views/home/home';
import { NotFound } from '../views/not-found/not-found';


export const routes = {
  public: [
    { path: '/not-found', page: NotFound },
    { path: '/home', page: Home },
    { path: '/home/data', page: DataView}
  ],
};