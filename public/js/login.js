import $ from "./utils/jQuery.js"

// reach for the login button
let logInForm = $('#loginButton')

const loginFormHandler = async (event) => {
    event.preventDefault();

    // collect values
    const username = $('#usernameLogin').val()
    const password = $('#passwordLogin').val()

    // if username and password match, send a POST request
    if(username && password) {
        const response = await fetch('/api/users/login' , {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'},
        });
    
        if (response.ok) {
            document.location.replace('/')
        }
        else{
            console.log(response.statusText)
        }
    }
};

// event listener
logInForm.submit(loginFormHandler)