
const theme = Number(localStorage.getItem("theme") || 0);

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
    update && localStorage.setItem("theme", (Number(theme) || 0) + 1);

    if (theme % 2 == 0) {
        document.documentElement.classList.remove('dark')
    } else {
        document.documentElement.classList.add('dark')
    }


}


const switchTheme = () => {
    updateTheme();
    location.reload();

}