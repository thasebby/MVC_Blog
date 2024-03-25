const deletePost = async (post_id) => {
    const response = await fetch(`/api/posts/${post_id}`, {
        method:"DELETE",
        headers: { "Content-Type": "application/json"},
    });

    if (response.ok) {
        document.location.reload();
    }
    else{
        console.log("Failed to delete the post.");
    }
};

const postHandler = (event) => {
    if(event.target.matches(".deletePost")) {
        const post_id = event.target.getAttribute("data-post-id");
        deletePost(post_id);
    }
};

document.addEventListener("click", postHandler);