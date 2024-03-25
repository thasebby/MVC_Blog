import $ from './utils/jQuery.js'

// reaching to the post submit button
const newPostSubmit = $('form#postSubmit')

// reaching the title and text section for post
const newPostHandler = async (event) => {
    const title = $('#blogTitle').val().trim();
    const text = $('#blogText').val().trim();

    if (title && text) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else{
            console.log(response.statusText)
        }
    }
};

// event listener
newPostSubmit.submit(newPostHandler);

