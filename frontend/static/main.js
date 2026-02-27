// Function that runs once the window is fully loaded
window.onload = function () {
  // Attempt to retrieve the API base URL from the local storage
  let savedBaseUrl = localStorage.getItem("apiBaseUrl");
  // If a base URL is found in local storage, load the posts
  if (savedBaseUrl) {
    document.getElementById("api-base-url").value = savedBaseUrl;
    loadPosts();
  }
};

// Function to fetch all the posts from the API and display them on the page
async function loadPosts() {
  // Retrieve the base URL from the input field and save it to local storage
  let baseUrl = document.getElementById("api-base-url").value;
  localStorage.setItem("apiBaseUrl", baseUrl);
  // Use the Fetch API to send a GET request to the /posts endpoint
  try {
    const response = await fetch(`${baseUrl}/posts`);
    const data = await response.json();
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";
    data.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.className = "post";
      const contentDiv = document.createElement("div");
      contentDiv.className = "content-container";
      contentDiv.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
      postDiv.appendChild(contentDiv);
      const buttonDiv = document.createElement("div");
      buttonDiv.className = "button-container";
      buttonDiv.innerHTML = `<button onclick="deletePost(${post.id})" class="btn delete-btn">Delete</button>
      <button onclick="updatePost(${post.id})"class="btn edit-btn">Edit</button>`;
      postDiv.appendChild(buttonDiv);
      postContainer.appendChild(postDiv);
    });
  } catch (error) {
    console.error("Fetched failed:", error);
  }
}

// Function to send a POST request to the API to add a new post
async function addPost() {
  // Retrieve the values from the input fields
  let baseUrl = document.getElementById("api-base-url").value;
  let postTitle = document.getElementById("post-title").value;
  let postContent = document.getElementById("post-content").value;
  const postId = document.getElementById("post-id").value;

  // Use the Fetch API to send a POST request to the /posts endpoint
  if (postId) {
    // updatePost(postId);
    await sendUpdate(postId);
    loadPosts();
  } else {
    try {
      const response = await fetch(`${baseUrl}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: postTitle, content: postContent }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
      }
      let data = await response.json(); // Parse the JSON data from the response
      alert("Post successfully added:");
      document.getElementById("post-title").value = "";
      document.getElementById("post-content").value = "";
      await loadPosts(); // Reload the posts after adding a new one
    } catch (error) {
      console.error("Error:", error);
    } // If an error occurs, log it to the console
  }
}

// Function to send a DELETE request to the API to delete a post
async function deletePost(postId) {
  let baseUrl = document.getElementById("api-base-url").value;

  // Use the Fetch API to send a DELETE request to the specific post's endpoint
  try {
    let response = await fetch(`${baseUrl}/posts/${postId}`, {
      method: "DELETE",
    });
    let data = await response.json;
    console.log("Post deleted:", postId);
    alert("Post sucessfully deleted.");
    await loadPosts(); // Reload the posts after deleting one
  } catch (error) {
    console.error("Error:", error);
  } // If an error occurs, log it to the console
}

async function updatePost(postId) {
  let baseUrl = document.getElementById("api-base-url").value;

  try {
    let response = await fetch(`${baseUrl}/posts/${postId}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.error);
      return;
    }
    let data = await response.json();
    document.getElementById("post-id").value = postId;
    document.querySelector('button[onclick="addPost()"]').textContent =
      "Update Post";
    document.getElementById("post-title").value = data.title;
    document.getElementById("post-content").value = data.content;
  } catch (error) {
    console.error("Error:", error);
  } // If an error occurs, log it to the console
}

async function sendUpdate(postId) {
  let baseUrl = document.getElementById("api-base-url").value;
  let postTitle = document.getElementById("post-title").value;
  let postContent = document.getElementById("post-content").value;
  try {
    const response = await fetch(`${baseUrl}/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: postTitle, content: postContent }),
    });
    let data = await response.json(); // Parse the JSON data from the response
    alert("Post successfully updated.");
    document.getElementById("post-id").value = "";
    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";
    document.querySelector('button[onclick="addPost()"]').textContent =
      "Add Post";
    await loadPosts(); // Reload the posts after adding a new one
  } catch (error) {
    console.error("Error:", error);
  } // If an error occurs, log it to the console
}
