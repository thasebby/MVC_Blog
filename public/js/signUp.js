import $ from './utils/jQuery.js'

let signUpForm = $('#signupBtn')

const signUpFormHandler = async (event) => {
    event.preventDefault()

    // fetch username,password and email
    const username = $('#usernameSignup').val().trim()
    const email = $('#emailSignup').val().trim()
    const password = $('#passwordSignup').val().trim()
    console.log(username, email, password)

    if (username && email && password) {
        // consolidating info 
        let newUser = {
            username: username,
            email: email,
            password: password,
        }
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify( newUser ),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Signup Successful:', responseData);
                // console.log(response.ok)
                // document.location.replace('/');
            }
            else {
                console.error('Signup request failed:', response.statusText)
            }
        } catch (error) {
            console.error('Network error:, error');
        }
    }
};

// event listener
// signUpForm.click(signUpFormHandler)
signUpForm.on('click', signUpFormHandler)
