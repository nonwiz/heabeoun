
const theme = Number(localStorage.getItem("theme") || 0);


window.addEventListener('DOMContentLoaded', (event) => {
    const { href } = window.location;
    const nav = [...document.querySelector('nav').children];
    nav.forEach(link => {
        if (link.href == href) {
            link.classList.add("link-active");
        }
    })
    updateTheme(false);

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