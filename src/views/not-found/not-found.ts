import './not-found.css';

export function NotFound() {
  const $root = document.querySelector('#app') as HTMLDivElement;
  $root.innerHTML = `
        <div class="not-found-container">
            <h2>Lo sentimos, la página no fue encontrada</h2>
        </div>
    `;
}
