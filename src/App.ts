import { Router } from './Router';

export function App() {
  const $root = document.getElementById('app') as HTMLDivElement;
  if (!$root) {
    throw new Error('Ocurrió un error inesperado');
  }
  Router();
}