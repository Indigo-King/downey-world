class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.style.display = 'block';
        const root = window.location.pathname.includes('/pages/') ? '../../' : './';
        this.innerHTML = `
            <header>
                <div class="header-content">
                    <h1 class="full-width">Downey</h1>
                    <h2><a href="${root}index.html">Home</a></h2>
                    <p> | </p>
                    <h2><a href="${root}pages/recipes/recipe-page.html">Recipes</a></h2>
                    <p> | </p>
                    <h2><a href="${root}pages/john/index.html">John</a></h2>
                    <p> | </p>
                    <h2><a href="${root}pages/courtney/index.html">Courtney</a></h2>
                </div>
            </header>
        `;
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.style.display = 'block';
        this.innerHTML = `
            <footer>
                <div class="footer-content">
                    <h2>Placeholder</h2>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
