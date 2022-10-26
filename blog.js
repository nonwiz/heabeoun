async function gql(query, variables={}) {
    const data = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return data.json();
}

const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "ThinkPanda") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                    type
                    dateUpdated
                    contentMarkdown	
                }
            }
        }
    }
`;

let articles = localStorage.getItem("articles");
articles = articles ? JSON.parse(articles) : []

window.addEventListener('DOMContentLoaded', (event) => {
    renderList(articles);
});

const renderList = (list) => {

    let container = document.createElement('ul');
    list.forEach(article => {
        const list = document.createElement('li')
        let title = document.createElement('a');
        title.innerText = article.title;
        title.href = `/story.html?slug=${article.slug}`;

        list.appendChild(title);
        container.appendChild(list);
    })

    document.querySelector('#blog').appendChild(container);
}

gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        const user_articles = result.data.user.publication.posts;
        if (JSON.stringify(user_articles) != JSON.stringify(articles)) {
            console.log("found newest content!");
            location.reload();
        }
        localStorage.setItem("articles", JSON.stringify(user_articles));


});

