
async function gql(query, variables = {}) {
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
const url = window.location.search;
const urlParams = new URLSearchParams(url);
const slug = urlParams.get("slug");

const getDOM = (ids) => {
  let tmp = [];
  ids.forEach(id => {
    const ele = document.querySelector(`#${id}`);
    tmp = [...tmp, ele];
  })
  return tmp;
}

const ids = ["title", "content"];
const parser = new DOMParser();

const renderContent = (article) => {
    const [title, content] = getDOM(ids);
    title.textContent = article.title;

    markdown = marked.parse(article.contentMarkdown);
    const domMd = parser.parseFromString(markdown, "text/html");
    console.log(domMd);
    // content.textContent = markdown;
    const container = document.createElement("div");
    content.append(container);
    container.innerHTML = markdown;
    // for (let ele of domMd.body.children) {
    //   content.append(ele);
    // }
    if (article == null) {
      console.log("Either you don't have such article or incorrect slug");
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    renderContent(articles.filter(article => article.slug == slug)[0]);
});


gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        const user_articles = result.data.user.publication.posts;
        if (JSON.stringify(user_articles) != JSON.stringify(articles)) {
            console.log("found newest content!");
            location.reload();
        }
        localStorage.setItem("articles", JSON.stringify(user_articles));
});

// const GET_USER_ARTICLE = `
// query GetUserPost($slug: String!) {
//   post(slug: $slug, hostname: "nonwiz" )
//   {
//     title
//     brief
//     slug
//     type
//     dateUpdated
//     contentMarkdown	
//   }

// }
// `;



// gql(GET_USER_ARTICLE, { slug: slug })
//   .then(result => {
//     const article = result.data.post;

//   });

