// Write your code here!
async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    displayPosts(posts);

    return posts; // IMPORTANT for mocha test
  } catch (error) {
    console.error(error);
    return [];
  }
}

function displayPosts(posts) {
  const ul = document.getElementById("post-list");

  if (!ul) return;

  ul.innerHTML = "";

  posts.forEach(post => {
    const li = document.createElement("li");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");

    h1.textContent = post.title;
    p.textContent = post.body;

    li.appendChild(h1);
    li.appendChild(p);
    ul.appendChild(li);
  });
}

/**
 * CRITICAL FIX FOR MOCHA:
 * Ensure DOM is ready AND fetch is triggered AFTER test setup
 */
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    fetchPosts();
  });
}