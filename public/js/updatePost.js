import $ from './utils/jQuery.js'

let editBtn = $('#edit-btn')
let deleteBtn = $('#delete-btn')

// finding the post ID
// using regex
const postID= parseInt(window.location.pathname.match(/\/(\d+)$/)[1]);

const updatePostHandler = async (event) => {
    event.preventDefault();

    const title = $('#updateTitle').val().trim()
    const text = $('#updateText').val().trim()

    if (title && text) {
        const response = await fetch(`/api/posts/${postID}`, {
            method: 'PUT',
            body: JSON.stringify({title,text}),
            headers: { "Content-type": "application/json"},
        });

        if(response.ok) {
            document.location.replace("/dashboard");
        }
        else{
            console.log(response.statusText);
        }
    }
};

const deletePostHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/posts/${postID}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    }
    else{
        console.log(response.statusText);
    }
};

editBtn.on('click',updatePostHandler)
deleteBtn.on('click',deletePostHandler)