import $ from './utils/jQuery.js'

let signUpForm = $('#signupBtn')

const signUpFormHandler = async (event) => {
    event.preventDefault()

    // fetch username,password and email
    const username = $('#usernameSignup').val().trim()
    const email = $('#emailSignup').val().trim()
    const password = $('#passwordSignup').val().trim()

    if(username && email && password){
        // consolidating info 
        let newUser = {
            username: username,
            email: email,
            password: password,
        }

        const response = await fetch ('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({newUser}),
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok) {
            document.location.replace('/');
        }
        else{
            console.log(response.statusText)
        }
    }
};

// event listener
signUpForm.submit(signUpFormHandler)