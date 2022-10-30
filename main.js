
let theme = Number(localStorage.getItem("theme") || 0);

window.addEventListener('DOMContentLoaded', async (event) => {

    updateTheme(false);
    let headerEle = document.querySelector("#header");
    await new Promise(resolve => {
        fetch('./layout/header.html').then(d => d.text()).then(text => {
            headerText = text;
            headerEle.outerHTML = text;
            resolve();
        })
    })
   const { href } = window.location;
    const nav = [...document.querySelector('nav').children];
    nav.forEach(link => {
        if (link.href == href) {
            link.classList.add("link-active");
        }
    })
    

});

const updateTheme = (update = true) => {
    if (update) {
        theme += 1;
        localStorage.setItem("theme", theme);
    }
    if (theme % 2 == 0) {
        document.documentElement.classList.remove('dark')
    } else {
        document.documentElement.classList.add('dark')
    }

}


const switchTheme = () => {
    updateTheme();
    updateTheme(false);

}

      const createArticle = (src, content) => {
        return  `
        <article class="group">
            <img src=${src} class="h-48 w-full grayscale group-hover:grayscale-0" />
            <aside class="absolute bottom-0 left-0 w-full">
            <p class="bg-black/40 opacity-0 group-hover:opacity-100 p-2 text-white h-full text-clip overflow-hidden">
              ${content}
            </p>
            </aside>
        </article>
        `
      }