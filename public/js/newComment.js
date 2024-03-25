import $ from "./utils/jQuery.js"

let newCommentSubmit = $('form#submitComment')

const newCommentHandler = async (event) => {
    event.preventDefault();

    // finding the post ID
    // using regex to match the last set of digits
    const postID= parseInt(window.location.pathname.match(/\/(\d+)$/)[1]);

    // selecting the comment field
    const text = $('#commentSection').val().trim();

    // checking if there is something in the comment section
    // creating a POST response
    if (text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment:text, postID}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.reload();
        }
        else{
            console.log(response.statusText);
        }
    }
    
};

// adding event listener to submit the text
newCommentSubmit.submit(newCommentHandler)