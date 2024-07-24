import { routes } from './helpers/routes';

export function Router() {
  const path = window.location.pathname;

  if (path === '/') {
    NavigateTo('/home');
    return;
  }
  const publicRoute = routes.public.find((route) => route.path === path);
  if (publicRoute) {
    publicRoute.page();
    return;
  }
  NavigateTo('/not-found');
}

export function NavigateTo(path: string) {
  window.history.pushState({}, '', window.location.origin + path);
  Router();
}

window.addEventListener('popstate', Router);
